// Import the useConnectEngine hook and useEngineVersion hook
import React from "react"
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/dist/Global"

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

  return <div>Component Content</div>
}

export default Component
