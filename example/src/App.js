import React, { useEffect } from "react"
import { useConnectEngine, Global, Doc, GenericObject } from "qlik-hooks"

const { useEngineVersion, useOpenDoc } = Global
const { useCreateSessionObject } = Doc
const { useSelectListObjectValues, useGetLayout } = GenericObject

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

  const listObjectLayout = useGetLayout(listObject, { params: [] })

  useEffect(() => {
    if (listObjectLayout.qResponse !== null) {
      console.log(listObjectLayout.qResponse.qListObject.qDataPages[0].qMatrix)
    }
  }, [listObjectLayout])

  return (
    <>
      <button onClick={() => selectListObjectValues.call("/qListObjectDef", [1], false)}>Select</button>
      <button onClick={() => listObjectLayout.call()}>Get Layout</button>
      {/* {engineVersion.qResponse === null ? <div>loading</div> : <div>{engineVersion.qResponse.qComponentVersion}</div>} */}
      {/* {engineVersion.qResponse === null ? <div>loading</div> : <div>{engineVersion.response.qComponentVersion}</div>} */}
    </>
  )
}
export default App
