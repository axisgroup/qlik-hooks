import React, { useEffect, useState } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useEngineVersion, useOpenDoc } from "qlik-hooks/dist/Global"
import { useCreateSessionObject, useClearAll } from "qlik-hooks/dist/Doc"
import { useSelectListObjectValues, useGetLayout } from "qlik-hooks/dist/GenericObject"
import "./App.css"

const qlikConfig = {
  host: "localhost",
  port: 19076,
  appname: "Executive Dashboard.qvf",
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
  const engine = useConnectEngine(qlikConfig)

  const engineVersion = useEngineVersion(engine, { params: [] })

  const doc = useOpenDoc(engine, { params: ["Executive Dashboard.qvf"] })

  const listObject = useCreateSessionObject(doc, { params: [qDef] })

  const selectListObjectValues = useSelectListObjectValues(listObject)

  const listObjectLayout = useGetLayout(listObject, { invalidations: true, params: [] })

  const clearApp = useClearAll(doc)

  useEffect(() => {
    console.log(clearApp)
  }, [clearApp])

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

  return (
    <>
      {engineVersion.qResponse === null ? <div>loading</div> : <div>{engineVersion.qResponse.qComponentVersion}</div>}
      <button onClick={() => clearApp.call()}>Clear All</button>
      <ul>
        {list.map(listValue => (
          <li
            key={listValue.value}
            className={listValue.state}
            value={listValue.value}
            onClick={() => selectListObjectValues.call("/qListObjectDef", [listValue.value], true)}
          >
            {listValue.label}
          </li>
        ))}
      </ul>
    </>
  )
}
export default App
