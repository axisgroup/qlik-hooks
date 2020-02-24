import React, { useEffect } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useEngineVersion, useOpenDoc } from "qlik-hooks/dist/Global"
import {
  ConnectToEngine,
  EngineVersion,
  MultipleGlobalCalls,
  OpenAnApp,
  ReadAppProperties,
  SetAppProps,
  GenObjValue,
  CurrentSelections,
  MakeASelection,
  LoopSelections,
  MakeLBSelections,
  SearchLB,
  ApplyPatches,
  GetDataPageOnInvalid,
  GetPagesInParallel,
  GetPagesInSequence,
  MakeSelectionsOnAppOpen,
  CalcTime,
  BatchInvalidations,
  ToggleSessions,
  Offline,
} from "./recipes"
import { useGetObject } from "qlik-hooks/dist/Doc"

const config = {
  host: "sense.axisgroup.com",
  isSecure: true,
  appname: "24703994-1515-4c2c-a785-d769a9226143",
}

const qId = "qZPdytp"

const App = () => {
  const engine = useConnectEngine(config)

  const app = useOpenDoc(engine, { params: [config.appname] })

  const getObject = useGetObject(app)

  useEffect(() => {
    getObject.call(qId)
  }, [qId])

  return null
}
export default App
