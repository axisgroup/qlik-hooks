import { useState, useEffect } from "react"
import { take } from "rxjs/operators"

export default ({ handle }, method, ...args) => {
  const [qResponse, setQResponse] = useState({
    loading: true,
    handle: null,
  })

  useEffect(() => {
    if (handle !== null) {
      handle
        .ask(method, ...args)
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

  return qResponse
}
