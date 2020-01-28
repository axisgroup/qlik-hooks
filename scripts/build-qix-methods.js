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

schema$.subscribe(schema => {
  let schemaDir = path.join(__dirname, "../src/schema")
  fs.emptyDirSync(schemaDir)
  fs.writeFile(path.join(schemaDir, `schema-${version}.json`), JSON.stringify(schema), "utf-8")
  // let qClasses = Object.keys(schema.services)

  // let classImports = []
  // let classExports = []

  // qClasses.forEach(qClass => {
  //   let methods = schema.services[qClass].methods

  //   let classDir = `../src/${qClass}`
  //   let absClassDir = path.join(__dirname, classDir)
  //   fs.emptyDirSync(absClassDir)

  //   const eNumScript = Object.keys(methods)
  //     .reduce((acc, methodName) => [`const ${methodName} = "${methodName}";`, ...acc, `export { ${methodName} };`], [])
  //     .join("\n")

  //   fs.writeFile(path.join(absClassDir, `index.js`), eNumScript)

  //   classImports.push(`import * as ${qClass} from "./${qClass}";`)
  //   classExports.push(`export { ${qClass} }`)
  // })
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
