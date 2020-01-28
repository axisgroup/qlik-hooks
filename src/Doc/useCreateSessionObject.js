import { useState, useEffect } from "react"
import { take } from "rxjs/operators"

export default ({ handle }, { params }) => {
  const [qResponse, setQResponse] = useState({
    loading: true,
    handle: null,
  })

  useEffect(() => {
    if (handle !== null) {
      handle
        .ask("CreateSessionObject", ...params)
        .pipe(take(1))
        .subscribe(response =>
          setQResponse({
            ...qResponse,
            loading: false,
            handle: response,
          })
        )
    }
  }, [handle])

  // useEffect(() => {
  //   if(qResponse.handle !== null) {
  //     qResponse.handle.invalidated$
  //   }
  // }, [qResponse.handle])

  return qResponse
}
