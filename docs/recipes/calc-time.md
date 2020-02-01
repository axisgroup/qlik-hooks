# Calculate the response time of the API

```javascript
import React, { useEffect, useState, useRef } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/dist/Global"

const appname = "aae16724-dfd9-478b-b401-0d8038793adf"

// Define the configuration for your session
const config = {
  host: "sense.axisgroup.com",
  isSecure: true,
}

const Component = () => {
  // Connect to the engine
  const engine = useConnectEngine(config)

  // Create a ref to store the time when app open is requested
  const appRequestTime = useRef()
  // OpenDoc API
  const app = useOpenDoc(engine)

  // When engine is ready ..
  useEffect(() => {
    if (engine.handle !== null) {
      // Set timer
      appRequestTime.current = Date.now()
      // Open App request
      app.call(appname)
    }
  }, [engine, appRequestTime])

  // Open Time state
  const [appOpenTime, setAppOpenTime] = useState(0)
  useEffect(() => {
    // When app.handle is set
    if (app.handle !== null) {
      // take time
      setAppOpenTime(Date.now() - appRequestTime.current)
    }
  }, [app, appRequestTime])

  return <div>App Open Time: {appOpenTime}ms</div>
}
```
