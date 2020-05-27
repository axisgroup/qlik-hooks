import { useState, useEffect, useRef, useCallback } from "react";
import { ReplaySubject } from "rxjs";
import { startWith, switchMap, skip, retry } from "rxjs/operators";

export default ({ handle }, { params } = {}) => {
  const call$ = useRef(new ReplaySubject()).current;
  const call = useCallback((...args) => {
    call$.next(args);
  }, []);

  const [qObject, setQObject] = useState({ loading: false, handle: null, error: null, call });

  useEffect(() => {
    let sub$;

    if(handle !== null) {
      sub$ = call$
        .pipe(
          startWith(params),
          skip(params ? 0 : 1),
          switchMap(args => {
            setQObject({ ...qObject, loading: true, handle: null });
            return handle.ask("GetVariable", ...args).pipe(retry(3));
          })
        )
        .subscribe(
          response => setQObject({ ...qObject, loading: false, handle: response }),
          err => {
            setQObject(prevState => ({ ...prevState, error: err }));
            console.error(err);
          }
        );
    }

    return () => {
      if(sub$) sub$.unsubscribe();
    }
  }, [handle]);

  return qObject;
}