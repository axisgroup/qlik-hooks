import React, { useEffect } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useEngineVersion } from "qlik-hooks/dist/Global"
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

const App = () => {
  return <Offline />
}
export default App
