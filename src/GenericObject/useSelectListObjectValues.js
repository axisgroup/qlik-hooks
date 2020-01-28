import { useState, useEffect, useRef, useCallback } from "react"
import { Subject } from "rxjs"
import { startWith, switchMap, skip } from "rxjs/operators"

export default ({ handle }, { params } = {}) => {
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
      sub$ = call$
        .pipe(
          startWith(params),
          skip(params ? 0 : 1),
          switchMap(args => {
            setQResponse({
              ...qResponse,
              loading: true,
              qResponse: null,
            })
            return handle.ask("SelectListObjectValues", ...args)
          })
        )
        .subscribe(response => {
          setQResponse({
            ...qResponse,
            loading: false,
            setQResponse: response,
          })
        })
    }

    return () => {
      if (sub$) sub$.unsubscribe()
    }
  }, [handle])

  return qResponse
}
