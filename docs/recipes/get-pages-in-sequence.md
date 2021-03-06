# Get HyperCube Pages in Sequence

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

const rowsPerPage = 10

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

  // Set matrix data into data array
  const [data, setData] = useState([])

  // Page count state
  const [pageCount, setPageCount] = useState(0)
  // When object layout updates..
  useEffect(() => {
    if (objLayout.qResponse !== null) {
      // Get the total rows from the layout HyperCube size
      const totalRows = objLayout.qResponse.qHyperCube.qSize.qcy
      // Calculate # of pages
      const noOfPages = Math.ceil(totalRows / rowsPerPage)

      // empty data array
      setData([])

      // set page count
      setPageCount(noOfPages)
    }
  }, [objLayout])

  // Get HypeCube Data api
  const hyperCubeData = useGetHyperCubeData(obj)
  // When pageCount updates..
  useEffect(() => {
    if (pageCount > 0) {
      // Get page index
      const pageIndex = pageCount - 1
      // Request data
      hyperCubeData.call("/qHyperCubeDef", [
        {
          qTop: pageIndex * rowsPerPage,
          qLeft: 0,
          qWidth: 2,
          qHeight: rowsPerPage,
        },
      ])
    }
  }, [pageCount])

  // When hyperCubeData updates..
  useEffect(() => {
    if (hyperCubeData.qResponse !== null) {
      // Reduce pageCount, triggering the next hyperCubeData call
      setPageCount(pageCount => pageCount - 1)
      // append incoming dataset to data array
      setData(data => [...hyperCubeData.qResponse[0].qMatrix, ...data])
    }
  }, [hyperCubeData])

  return (
    // Render table of data
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
