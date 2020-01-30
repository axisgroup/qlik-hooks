import React, { useEffect, useState } from "react"
import { useConnectEngine, QlikProvider, schema } from "qlik-hooks"
import { useEngineVersion, useOpenDoc, useGetDocList } from "qlik-hooks/dist/Global"
import { useCreateSessionObject, useClearAll } from "qlik-hooks/dist/Doc"
import { useSelectListObjectValues, useGetLayout } from "qlik-hooks/dist/GenericObject"
import { Dashboard, EngineVersion, HandleInvalidations } from "./components"
import "./App.css"

const qlikConfig = {
  host: "localhost",
  port: 19076,
}

const qDef = {
  qInfo: { qType: "listbox" },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ["Region"],
    },
    qInitialDataFetch: [{ qWidth: 1, qHeight: 100 }],
  },
}

const App = () => {
  const engine = useConnectEngine({
    host: "localhost",
    port: 19076,
  })

  const doc = useOpenDoc(engine, { params: ["Executive Dashboard.qvf"] })

  const listObject = useCreateSessionObject(doc, {
    params: [
      {
        qInfo: { qType: "listbox" },
        qListObjectDef: {
          qDef: { qFieldDefs: ["Region"] },
          qInitialDataFetch: [{ qWidth: 1, qHeight: 100 }],
        },
      },
    ],
  })

  const listObjectLayout = useGetLayout(listObject, { params: [], invalidations: true })

  const [list, setList] = useState([])
  useEffect(() => {
    if (listObjectLayout.qResponse !== null) {
      const qMatrix = listObjectLayout.qResponse.qListObject.qDataPages[0].qMatrix

      setList(
        qMatrix.map(row => ({
          label: row[0].qText,
          value: row[0].qElemNumber,
          state: row[0].qState,
        }))
      )
    }
  }, [listObjectLayout])

  const selectListObjectValues = useSelectListObjectValues(listObject)

  const handleListObjectSelection = value => {
    selectListObjectValues.call("/qListObjectDef", [value], true)
  }

  return (
    <div>
      <ul>
        {list.map(listItem => (
          <li
            key={listItem.value}
            value={listItem.value}
            style={{
              backgroundColor: listItem.state === "S" ? "#2294f2" : listItem.state === "X" ? "#b1c0c7" : "#fff",
            }}
            onClick={() => handleListObjectSelection(listItem.value)}
          >
            {listItem.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App
