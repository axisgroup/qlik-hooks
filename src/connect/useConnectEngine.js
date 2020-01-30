import { useState, useEffect } from "react"
import { connectSession } from "rxq"

export default config => {
  const [engine, setEngine] = useState({
    loading: true,
    handle: null,
  })

  useEffect(() => {
    const session = connectSession(config)
    const { global$ } = session

    global$.subscribe(globalHandle => setEngine({ ...engine, loading: false, handle: globalHandle }))

    return () => session.close()
  }, [])

  return engine
}
