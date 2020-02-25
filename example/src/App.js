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

const config = {
  host: "172.16.84.100",
  isSecure: true,
  appname: "1fcd2925-dc43-4816-b4b5-b8f4a991afdc",
}

const userMap = {
  jbellizzi: "'1', '2'",
  user_nokia: "1",
}

const App = () => {
  const global = useConnectEngine(config)

  const app = useOpenDoc(global, { params: [config.appname] })

  /** Get user and set access level */
  const [userAccess, setUserAccess] = useState(null)
  const user = useGetAuthenticatedUser(global, { params: [] })
  useEffect(() => {
    if (user.qResponse !== null) {
      setUserAccess(userMap[user.qResponse.split("UserId=")[1]])
    }
  }, [user])

  /** Get the clientID variable */
  const variable = useGetVariableByName(app, { params: ["vClientID"] })
  // const setVariable = useSetStringValue(variable, { params: ["5"] })
  /** set up variable set string method */
  const setVariable = useSetStringValue(variable)
  useEffect(() => {
    if (userAccess !== null) {
      console.log(userAccess)
      setVariable.call(userAccess)
    }
  }, [userAccess])

  return null
}
export default App
