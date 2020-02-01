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
  const app = useOpenDoc(engine, { params: [appname] })

  // Create GenericObject with formula
  const obj = useCreateSessionObject(app, {
    params: [
      {
        qInfo: { qType: "my-object" },
        qSelectionObjectDef: {},
      },
    ],
  })

  // Get the layout of the GenericObject to calculate the value
  const objLayout = useGetLayout(obj, { params: [], invalidations: true })

  return (
    <div>
      {/* Display selections output */}
      Selections:
      {objLayout.qResponse !== null ? (
        objLayout.qResponse.qSelectionObject.qSelections.map((sel, i) => (
          <div key={i}>
            <strong>{sel.qField}:</strong> {sel.qSelected}
          </div>
        ))
      ) : (
        <div>loading...</div>
      )}
    </div>
  )
}

export default Component
