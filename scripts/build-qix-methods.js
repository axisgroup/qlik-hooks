let fs = require("fs-extra")
let path = require("path")
let pack = JSON.parse(fs.readFileSync("package.json", "utf8"))
let Docker = require("dockerode")
let { Observable } = require("rxjs")
let { publishReplay, refCount, switchMap } = require("rxjs/operators")
const http = require("http")

// qix version
let version = pack["qix-version"]

const image = `qlikcore/engine:${version}`
const port = "9079"

const container$ = createContainer(image, port)

const schema$ = container$.pipe(
  switchMap(container =>
    Observable.create(observer => {
      http
        .get(`http://localhost:${port}/jsonrpc-api`, resp => {
          let data = ""

          resp.on("data", chunk => {
            data += chunk
          })

          resp.on("end", () => {
            container.kill((err, result) => {
              container.remove()
              observer.complete()
            })

            observer.next(JSON.parse(data))
          })
        })
        .on("error", err => {
          observer.error(err)
        })
    })
  )
)

const apiObjectCreatorTemplate = MethodName => `import { useState, useEffect, useRef, useCallback } from "react";
import { ReplaySubject } from "rxjs";
import { startWith, switchMap, skip } from "rxjs/operators";

export default ({ handle }, { params } = {}) => {
  const call$ = useRef(new ReplaySubject()).current;
  const call = useCallback((...args) => {
    call$.next(args);
  }, []);

  const [qObject, setQObject] = useState({ loading: false, handle: null, call });

  useEffect(() => {
    let sub$;

    if(handle !== null) {
      sub$ = call$
        .pipe(
          startWith(params),
          skip(params ? 0 : 1),
          switchMap(args => {
            setQObject({ ...qObject, loading: true, handle: null });
            return handle.ask("${MethodName}", ...args);
          })
        )
        .subscribe(response => setQObject({ ...qObject, loading: false, handle: response }));
    }

    return () => {
      if(sub$) sub$.unsubscribe();
    }
  }, [handle]);

  return qObject;
}`

const apiActionTemplate = MethodName => `import { useState, useEffect, useRef, useCallback } from "react";
import { Subject, merge } from "rxjs";
import { startWith, mergeMap, skip, mapTo, filter } from "rxjs/operators";
import { useObjectMemo } from "../hooks";

export default ({ handle }, { params, invalidations = false } = {}) => {
  const params_memo = useObjectMemo(params);

  const call$ = useRef(new Subject()).current;
  const call = useCallback((...args) => {
    call$.next(args);
  }, []);

  const [qAction, setQAction] = useState({ loading: false, qResponse: null, call });

  useEffect(() => {
    let sub$;

    if(handle !== null) {
      const invalidation$ = handle.invalidated$.pipe(
        filter(() => invalidations && params_memo),
        mapTo(params_memo)
      );

      const externalCall$ = call$.pipe(
        startWith(params_memo),
        skip(params_memo ? 0 : 1)
      );

      sub$ = merge(externalCall$, invalidation$)
        .pipe(
          mergeMap(args => {
            setQAction({ ...qAction, loading: true, qResponse: null });
            return handle.ask("${MethodName}", ...args);
          })
        )
        .subscribe(response => setQAction({ ...qAction, loading: false, qResponse: response }));
    }

    return () => {
      if(sub$) sub$.unsubscribe();
    }
  }, [handle, params_memo, invalidations]);

  return qAction;
}`

schema$.subscribe(schema => {
  let schemaDir = path.join(__dirname, "../src/schema")
  fs.emptyDirSync(schemaDir)
  fs.writeFile(path.join(schemaDir, `schema-${version}.json`), JSON.stringify(schema), "utf-8")

  let qClasses = Object.entries(schema.services)

  // let classImports = []
  // let classExports = []

  qClasses.forEach(([qClass, { methods }]) => {
    let absClassDir = path.join(__dirname, `../src/${qClass}`)
    fs.emptyDirSync(absClassDir)

    Object.entries(methods).forEach(([MethodName, { responses }]) => {
      let isObjectCreator = responses
        ? responses.map(response => response["x-qlik-service"]).filter(xQlikService => xQlikService !== undefined)
            .length > 0
        : false

      fs.writeFile(
        path.join(absClassDir, `use${MethodName}.js`),
        isObjectCreator ? apiObjectCreatorTemplate(MethodName) : apiActionTemplate(MethodName)
      )
    })

    //   const eNumScript = Object.keys(methods)
    //     .reduce((acc, methodName) => [`const ${methodName} = "${methodName}";`, ...acc, `export { ${methodName} };`], [])
    //     .join("\n")

    //   fs.writeFile(path.join(absClassDir, `index.js`), eNumScript)

    //   classImports.push(`import * as ${qClass} from "./${qClass}";`)
    //   classExports.push(`export { ${qClass} }`)

    const eNumScript = Object.keys(methods)
      .reduce((acc, methodName) => [...acc, `export { default as use${methodName} } from "./use${methodName}";`], [])
      .join("\n")

    fs.writeFile(path.join(absClassDir, `index.js`), eNumScript)
  })
})

function createContainer(image, port) {
  // launce new container
  let container$ = Observable.create(observer => {
    let docker = new Docker()

    docker.createContainer(
      {
        Image: image,
        Cmd: ["-S", "AcceptEULA=yes"],
        HostConfig: {
          RestartPolicy: {
            Name: "always",
          },
          PortBindings: {
            "9076/tcp": [
              {
                HostPort: port,
              },
            ],
          },
        },
      },
      (err, container) => {
        if (err) return observer.erros(err)

        container.start((err, data) => {
          if (err) return observer.error(err)

          setTimeout(() => {
            observer.next(container)
            observer.complete()
          }, 2000)
        })
      }
    )
  }).pipe(
    publishReplay(1),
    refCount()
  )

  return container$
}
