import React, { useEffect, useState, useRef } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/dist/Global"
import { useCreateSessionObject, useClearAll, useGetField } from "qlik-hooks/dist/Doc"
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

  // OpenDoc
  const app = useOpenDoc(engine, { params: [appname] })

  // Create expression object
  const obj = useCreateSessionObject(app, {
    params: [
      {
        qInfo: { qType: "custom" },
        value: { qValueExpression: "=avg(petal_width)" },
      },
    ],
  })

  // Get layout
  const layout = useGetLayout(obj, { params: [], invalidations: true })

  // Petal Width state
  const [avgPetalWidth, setAvgPetalWidth] = useState("-")
  // When layout updates..
  useEffect(() => {
    // set state if there is a response, otherwise set to '-'
    if (layout.qResponse !== null) setAvgPetalWidth(layout.qResponse.value)
    else setAvgPetalWidth("-")
  }, [layout])

  // ClearAll
  const clearAll = useClearAll(app)

  // Field
  const speciesField = useGetField(app, { params: ["species"] })

  return (
    <div>
      <div>Avg Petal Width: {avgPetalWidth}</div>
      <button onClick={() => {}}>Batch Ops</button>
    </div>
  )
}

export default Component
