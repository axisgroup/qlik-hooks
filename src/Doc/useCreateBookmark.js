import { useState, useEffect, useRef, useCallback } from "react";
import { Subject } from "rxjs";
import { startWith, switchMap, skip } from "rxjs/operators";

export default ({ handle }, { params } = {}) => {
  const call$ = useRef(new Subject()).current;
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
            return handle.ask("CreateBookmark", ...args);
          })
        )
        .subscribe(response => setQObject({ ...qObject, loading: false, handle: response }));
    }

    return () => {
      if(sub$) sub$.unsubscribe();
    }
  }, [handle]);

  return qObject;
}