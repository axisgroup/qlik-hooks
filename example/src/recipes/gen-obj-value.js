import React from "react"
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/dist/Global"
import { useCreateSessionObject } from "qlik-hooks/dist/Doc"
import { useGetLayout } from "qlik-hooks/dist/GenericObject"

const appname = "aae16724-dfd9-478b-b401-0d8038793adf"

// Define the configuration for your session
const config = {
  host: "sense.axisgroup.com",
  isSecure: true,
  appname,
}

const Component = () => {
  // Connect to the engine
  const engine = useConnectEngine(config)

  // Open an app
  const app = useOpenDoc(engine, { params: ["aae16724-dfd9-478b-b401-0d8038793adf"] })

  // Create GenericObject with formula
  const obj = useCreateSessionObject(app, {
    params: [
      {
        qInfo: { qType: "my-object" },
        myValue: { qValueExpression: "=avg(petal_length)" },
      },
    ],
  })

  // Get the layout of the GenericObject to calculate the value
  const objLayout = useGetLayout(obj, { params: [] })

  return (
    <div>
      {/* Display object value output */}
      Petal Length: {objLayout.qResponse !== null ? <div>{objLayout.qResponse.myValue}</div> : <div>loading...</div>}
    </div>
  )
}

export default Component
