import { useState, useEffect, useRef, useCallback } from "react"
import { connectSession } from "rxq"
import { Subject } from "rxjs"
import { startWith, map, switchMap, tap, catchError, shareReplay } from "rxjs/operators"
import delve from "dlv"

export default config => {
  const call$ = useRef(new Subject()).current
  const call = useCallback(config => {
    call$.next(config)
  })

  const [engine, setEngine] = useState({
    loading: true,
    handle: null,
    error: null,
    close: null,
    suspend: null,
    unsuspend: null,
    call,
  })

  useEffect(() => {
    let sub$

    const session$ = call$.pipe(
      startWith(config),
      map(config => connectSession(config)),
      shareReplay(1)
    )

    sub$ = session$
      .pipe(
        switchMap(session =>
          session.global$.pipe(
            tap(globalHandle => {
              setEngine(prevState => ({
                ...prevState,
                loading: false,
                handle: globalHandle,
                error: null,
                close: session.close,
                suspend: session.suspend,
                unsuspend: session.unsuspend,
              }))
            })
          )
        )
      )
      .subscribe()

    session$.pipe(switchMap(session => session.notifications$)).subscribe(msg => {
      const qpsErrorMethod = delve(msg, "data.method", undefined)

      if (
        [
          "OnLicenseAccessDenied",
          "OnSessionClosed",
          "OnSessionLoggedOut",
          "OnSessionTimedOut",
          "OnEngineWebsocketFailed",
          "OnRepositoryWebsocketFailed",
          "OnDataPrepServiceWebsocketFailed",
          "OnNoEngineAvailable",
          "OnNoRepositoryAvailable",
          "OnNoDataPrepServiceAvailable",
        ].includes(qpsErrorMethod)
      ) {
        setEngine(prevState => ({
          ...prevState,
          error: msg.data.params,
        }))
      }
    })

    return () => {
      session.close()
      sub$.unsubscribe()
    }
  }, [])

  return engine
}
