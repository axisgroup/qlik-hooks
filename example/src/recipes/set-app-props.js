import React from "react"
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/dist/Global"
import { useGetAppProperties, useSetAppProperties } from "qlik-hooks/dist/Doc"

// Define the configuration for your session
const config = {
  host: "sense.axisgroup.com",
  isSecure: true,
}

const Component = () => {
  // Connect to the engine
  const engine = useConnectEngine(config)

  // Open an app
  const app = useOpenDoc(engine, { params: ["aae16724-dfd9-478b-b401-0d8038793adf"] })

  // Get the app properties
  const appProps = useGetAppProperties(app, { params: [], invalidations: true })

  // Create SetAppProperties API instance
  const setAppProps = useSetAppProperties(app)

  return (
    <div>
      {/* Call setApprops when click button */}
      <button onClick={() => setAppProps.call({ random: Math.random() })}>Set Random</button>
      {/* Display app props when available */}
      {appProps.qResponse !== null ? <div>{appProps.qResponse.random}</div> : <div>loading...</div>}
    </div>
  )
}

export default Component
