import { useState, useEffect, useRef, useCallback } from "react"
import { Subject, merge, of } from "rxjs"
import { startWith, switchMap, skip, mapTo, filter } from "rxjs/operators"

export default ({ handle }, { params, invalidations = false } = {}) => {
  const call$ = useRef(new Subject()).current
  const call = useCallback((...args) => {
    call$.next(args)
  }, [])

  const [qResponse, setQResponse] = useState({
    loading: false,
    qResponse: null,
    call,
  })

  useEffect(() => {
    let sub$

    if (handle !== null) {
      const invalidation$ = handle.invalidated$.pipe(
        filter(() => invalidations && params),
        mapTo(params)
      )

      const externalCall$ = call$.pipe(
        startWith(params),
        skip(params ? 0 : 1)
      )

      sub$ = merge(externalCall$, invalidation$)
        .pipe(
          switchMap(args => {
            setQResponse({ ...qResponse, loading: true, qResponse: null })
            return handle.ask("GetLayout", ...args)
          })
        )
        .subscribe(response => {
          setQResponse({ ...qResponse, loading: false, qResponse: response })
        })
    }

    return () => {
      if (sub$) sub$.unsubscribe()
    }
  }, [handle])

  return qResponse
}
