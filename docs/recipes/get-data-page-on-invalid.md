# Get a page of data from a HyperCube on invalidation

```javascript
import React, { useState, useEffect } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/Global"
import { useCreateSessionObject } from "qlik-hooks/Doc"
import { useGetLayout, useGetHyperCubeData } from "qlik-hooks/GenericObject"

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
        qHyperCubeDef: {
          qDimensions: [{ qDef: { qFieldDefs: ["petal_length"] } }],
          qMeasures: [{ qDef: { qDef: "=avg(petal_width)" } }],
        },
      },
    ],
  })

  // Get the layout on invalidations, then request a data page
  const objLayout = useGetLayout(obj, { params: [], invalidations: true })

  const hyperCubeData = useGetHyperCubeData(obj)

  // Once layout is available, request hyper cube data
  useEffect(() => {
    if (objLayout.qResponse !== null) {
      hyperCubeData.call("/qHyperCubeDef", [{ qTop: 0, qLeft: 0, qWidth: 2, qHeight: 100 }])
    }
  }, [objLayout])

  // Set matrix data into data array
  const [data, setData] = useState([])
  useEffect(() => {
    if (hyperCubeData.qResponse !== null) {
      setData(hyperCubeData.qResponse[0].qMatrix)
    }
  }, [hyperCubeData])

  return (
    <table>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row[0].qText}</td>
            <td>{row[1].qText}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```
