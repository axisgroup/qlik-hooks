import { useCallback, useEffect, useRef, useState } from "react"
import { of, ReplaySubject } from "rxjs"
import { catchError, retry, skip, startWith, switchMap } from "rxjs/operators"

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
            setQObject(prevState => ({ ...prevState, loading: true, handle: null, error: null }));
            return handle.ask("GetChild", ...args).pipe(
              retry(3),
              catchError(err => {
                setQObject(prevState => ({ ...prevState, error: err }))
                console.error(err)
                return of(null)
              })
            );
          })
        )
        .subscribe(response => setQObject(prevState => ({ ...prevState, loading: false, handle: response })));
    }

    return () => {
      if(sub$) sub$.unsubscribe();
    }
  }, [handle]);

  return qObject;
}