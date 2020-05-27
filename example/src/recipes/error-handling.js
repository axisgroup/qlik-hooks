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
  const app = useOpenDoc(engine)
  console.log(app)

  return (
    <div>
      <button
        onClick={() => {
          app.call("aae16724-dfd9-478b-b401-0d8038793adf")
        }}
      >
        Open Doc
      </button>
      <button
        onClick={() => {
          app.call("aae16724-dfd9-478b-b401-0d8038793ad")
        }}
      >
        Open Non-Existant Doc
      </button>
    </div>
  )
}

export default Component
