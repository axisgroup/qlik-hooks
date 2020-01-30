// Import the useConnectEngine hook and useEngineVersion hook
import React from "react"
import { useConnectEngine } from "qlik-hooks"
import { useEngineVersion } from "qlik-hooks/dist/Global"

// Define the configuration for your session
const config = {
  host: "sense.axisgroup.com",
  isSecure: true,
}

const Component = () => {
  // Connect to the engine
  const engine = useConnectEngine(config)

  // Get the engine version
  const engineVersion = useEngineVersion(engine, { params: [] })

  // Display the engine version when it is available
  return engineVersion.qResponse !== null ? (
    <div>{engineVersion.qResponse.qComponentVersion}</div>
  ) : (
    <div>loading...</div>
  )
}

export default Component
