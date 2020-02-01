import { useState, useEffect, useRef, useCallback } from "react";
import { Subject, merge } from "rxjs";
import { startWith, mergeMap, skip, mapTo, filter } from "rxjs/operators";

export default ({ handle }, { params, invalidations = false } = {}) => {
  const call$ = useRef(new Subject()).current;
  const call = useCallback((...args) => {
    call$.next(args);
  }, []);

  const [qAction, setQAction] = useState({ loading: false, qResponse: null, call });

  useEffect(() => {
    let sub$;

    if(handle !== null) {
      const invalidation$ = handle.invalidated$.pipe(
        filter(() => invalidations && params),
        mapTo(params)
      );

      const externalCall$ = call$.pipe(
        startWith(params),
        skip(params ? 0 : 1)
      );

      sub$ = merge(externalCall$, invalidation$)
        .pipe(
          mergeMap(args => {
            setQAction({ ...qAction, loading: true, qResponse: null });
            return handle.ask("ApplyPatches", ...args);
          })
        )
        .subscribe(response => setQAction({ ...qAction, loading: false, qResponse: response }));
    }

    return () => {
      if(sub$) sub$.unsubscribe();
    }
  }, [handle]);

  return qAction;
}