import { useState, useEffect, useCallback, useRef } from "react"
import { take, switchMap, startWith, tap, shareReplay, skip } from "rxjs/operators"
import { Subject, ReplaySubject } from "rxjs"

export default ({ handle }, method, { initialize = true, initialArgs = [] } = {}) => {
  const [loading, setLoading] = useState(false)
  const [qResponse, setQResponse] = useState(null)

  const action$ = useRef(new Subject()).current
  const call = (...args) => {
    action$.next(args)
  }

  useEffect(() => {
    let sub$

    if (handle !== null) {
      sub$ = action$
        .pipe(
          startWith(initialArgs),
          skip(initialize ? 0 : 1),
          switchMap(args => {
            setLoading(true)
            setQResponse(null)
            return handle.ask(method, ...args)
          })
        )
        .subscribe(response => {
          setLoading(false)
          setQResponse(response)
        })
    }

    return () => {
      if (sub$) sub$.unsubscribe()
    }
  }, [handle])

  return {
    loading,
    qResponse,
    call,
  }
}
