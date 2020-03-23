import React, { useEffect, useState } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useEngineVersion, useOpenDoc, useGetAuthenticatedUser } from "qlik-hooks/dist/Global"
import { useGetObject, useGetVariableByName } from "qlik-hooks/dist/Doc"
import { useSetStringValue } from "qlik-hooks/dist/GenericVariable"
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
  return <ApplyPatches />
}
export default App
