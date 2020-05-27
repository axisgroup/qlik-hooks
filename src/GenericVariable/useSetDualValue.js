import { useCallback, useEffect, useRef, useState } from "react"
import { of, ReplaySubject, merge } from "rxjs";
import { catchError, startWith, mergeMap, skip, mapTo, filter, retry } from "rxjs/operators";
import { useObjectMemo } from "../hooks";

export default ({ handle }, { params, invalidations = false } = {}) => {
  const params_memo = useObjectMemo(params);

  const call$ = useRef(new ReplaySubject()).current;
  const call = useCallback((...args) => {
    call$.next(args);
  }, []);

  const [qAction, setQAction] = useState({ loading: false, qResponse: null, error: null, call });

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
            setQAction(prevState => ({ ...prevState, loading: true, qResponse: null, error: null }));
            return handle.ask("SetDualValue", ...args).pipe(
              retry(3),
              catchError(err => {
                setQAction(prevState => ({ ...prevState, error: err }))
                console.error(err)
                return of(null)
              })
            );
          })
        )
        .subscribe(response => setQAction(prevState => ({ ...prevState, loading: false, qResponse: response })));
    }

    return () => {
      if(sub$) sub$.unsubscribe();
    }
  }, [handle, params_memo, invalidations]);

  return qAction;
}