import { useState, useEffect, useRef, useCallback } from "react";
import { ReplaySubject, merge } from "rxjs";
import { startWith, mergeMap, skip, mapTo, filter, retry } from "rxjs/operators";
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
            setQAction({ ...qAction, loading: true, qResponse: null });
            return handle.ask("SetLooselyCoupledVector", ...args).pipe(retry(3));
          })
        )
        .subscribe(
          response => setQAction(prevState => ({ ...prevState, loading: false, qResponse: response })),
          err => {
            setQAction(prevState => ({ ...prevState, error: err }));
            console.error(err);
          }
        );
    }

    return () => {
      if(sub$) sub$.unsubscribe();
    }
  }, [handle, params_memo, invalidations]);

  return qAction;
}