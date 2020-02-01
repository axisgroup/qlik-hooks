import { useState, useEffect, useRef, useCallback } from "react"
import { connectSession } from "rxq"
import { Subject } from "rxjs"
import { startWith, map, switchMap, tap } from "rxjs/operators"

export default config => {
  const call$ = useRef(new Subject()).current
  const call = useCallback(config => {
    call$.next(config)
  })

  const [engine, setEngine] = useState({
    loading: true,
    handle: null,
    close: null,
    suspend: null,
    unsuspend: null,
    call,
  })

  useEffect(() => {
    let sub$

    const session$ = call$.pipe(
      startWith(config),
      map(config => connectSession(config))
    )

    sub$ = session$
      .pipe(
        switchMap(session =>
          session.global$.pipe(
            tap(globalHandle => {
              setEngine({
                ...engine,
                loading: false,
                handle: globalHandle,
                close: session.close,
                suspend: session.suspend,
                unsuspend: session.unsuspend,
              })
            })
          )
        )
      )
      .subscribe()

    return () => {
      session.close()
      sub$.unsubscribe()
    }
  }, [])

  return engine
}
