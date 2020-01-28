import { useState, useEffect } from "react"
import { connectSession } from "rxq"
import schema from "../schema/schema-12.556.0.json"
import delve from "dlv"

console.log(schema)

class Doc {
  constructor() {}

  CreateBookmarkEx() {
    console.log("CreateBookmarkEx")
  }
  DestroySessionVariableByName() {
    console.log("DestroySessionVariableByName")
  }
  DestroySessionVariableById() {
    console.log("DestroySessionVariableById")
  }
  ExpandExpression() {
    console.log("ExpandExpression")
  }
  GetVariables() {
    console.log("GetVariables")
  }
  GetScriptEx() {
    console.log("GetScriptEx")
  }
  GetFieldAndColumnSamples() {
    console.log("GetFieldAndColumnSamples")
  }
  SearchObjects() {
    console.log("SearchObjects")
  }
  SearchResults() {
    console.log("SearchResults")
  }
  SelectAssociations() {
    console.log("SelectAssociations")
  }
  SearchAssociations() {
    console.log("SearchAssociations")
  }
  SearchSuggest() {
    console.log("SearchSuggest")
  }
  SendGenericCommandToCustomConnector() {
    console.log("SendGenericCommandToCustomConnector")
  }
  GetFileTablesEx() {
    console.log("GetFileTablesEx")
  }
  GetFileTablePreview() {
    console.log("GetFileTablePreview")
  }
  GetFileTableFields() {
    console.log("GetFileTableFields")
  }
  GetFileTables() {
    console.log("GetFileTables")
  }
  GuessFileType() {
    console.log("GuessFileType")
  }
  GetFolderItemsForConnection() {
    console.log("GetFolderItemsForConnection")
  }
  GetDatabaseTablePreview() {
    console.log("GetDatabaseTablePreview")
  }
  GetDatabaseTableFields() {
    console.log("GetDatabaseTableFields")
  }
  GetDatabaseTables() {
    console.log("GetDatabaseTables")
  }
  GetDatabaseOwners() {
    console.log("GetDatabaseOwners")
  }
  GetDatabases() {
    console.log("GetDatabases")
  }
  GetDatabaseInfo() {
    console.log("GetDatabaseInfo")
  }
  GetConnections() {
    console.log("GetConnections")
  }
  GetConnection() {
    console.log("GetConnection")
  }
  DeleteConnection() {
    console.log("DeleteConnection")
  }
  ModifyConnection() {
    console.log("ModifyConnection")
  }
  CreateConnection() {
    console.log("CreateConnection")
  }
  GetIncludeFileContent() {
    console.log("GetIncludeFileContent")
  }
  SetFavoriteVariables() {
    console.log("SetFavoriteVariables")
  }
  GetFavoriteVariables() {
    console.log("GetFavoriteVariables")
  }
  CheckScriptSyntax() {
    console.log("CheckScriptSyntax")
  }
  SetScript() {
    console.log("SetScript")
  }
  GetSetAnalysis() {
    console.log("GetSetAnalysis")
  }
  ExportReducedData() {
    console.log("ExportReducedData")
  }
  ForwardCount() {
    console.log("ForwardCount")
  }
  BackCount() {
    console.log("BackCount")
  }
  DoReloadEx() {
    console.log("DoReloadEx")
  }
  GetLibraryContent() {
    console.log("GetLibraryContent")
  }
  GetContentLibraries() {
    console.log("GetContentLibraries")
  }
  GetMediaList() {
    console.log("GetMediaList")
  }
  GetAssociationScores() {
    console.log("GetAssociationScores")
  }
  SaveObjects() {
    console.log("SaveObjects")
  }
  Scramble() {
    console.log("Scramble")
  }
  FindMatchingFields() {
    console.log("FindMatchingFields")
  }
  GetMatchingFields() {
    console.log("GetMatchingFields")
  }
  Publish() {
    console.log("Publish")
  }
  AbortModal() {
    console.log("AbortModal")
  }
  Resume() {
    console.log("Resume")
  }
  GetAllInfos() {
    console.log("GetAllInfos")
  }
  GetFieldOnTheFlyByName() {
    console.log("GetFieldOnTheFlyByName")
  }
  AddFieldFromExpression() {
    console.log("AddFieldFromExpression")
  }
  CloneBookmark() {
    console.log("CloneBookmark")
  }
  ApplyBookmark() {
    console.log("ApplyBookmark")
  }
  GetBookmark() {
    console.log("GetBookmark")
  }
  DestroyBookmark() {
    console.log("DestroyBookmark")
  }
  CreateBookmark() {
    console.log("CreateBookmark")
  }
  RemoveAlternateState() {
    console.log("RemoveAlternateState")
  }
  AddAlternateState() {
    console.log("AddAlternateState")
  }
  CheckNumberOrExpression() {
    console.log("CheckNumberOrExpression")
  }
  CheckExpression() {
    console.log("CheckExpression")
  }
  GetVariableByName() {
    console.log("GetVariableByName")
  }
  GetVariableById() {
    console.log("GetVariableById")
  }
  DestroyVariableByName() {
    console.log("DestroyVariableByName")
  }
  DestroyVariableById() {
    console.log("DestroyVariableById")
  }
  CreateVariableEx() {
    console.log("CreateVariableEx")
  }
  DestroySessionVariable() {
    console.log("DestroySessionVariable")
  }
  CreateSessionVariable() {
    console.log("CreateSessionVariable")
  }
  CloneMeasure() {
    console.log("CloneMeasure")
  }
  GetMeasure() {
    console.log("GetMeasure")
  }
  DestroyMeasure() {
    console.log("DestroyMeasure")
  }
  CreateMeasure() {
    console.log("CreateMeasure")
  }
  CloneDimension() {
    console.log("CloneDimension")
  }
  GetDimension() {
    console.log("GetDimension")
  }
  DestroyDimension() {
    console.log("DestroyDimension")
  }
  CreateDimension() {
    console.log("CreateDimension")
  }
  ClearUndoBuffer() {
    console.log("ClearUndoBuffer")
  }
  Redo() {
    console.log("Redo")
  }
  Undo() {
    console.log("Undo")
  }
  DestroyDraft() {
    console.log("DestroyDraft")
  }
  CommitDraft() {
    console.log("CommitDraft")
  }
  CreateDraft() {
    console.log("CreateDraft")
  }
  CloneObject() {
    console.log("CloneObject")
  }
  GetBookmarks() {
    console.log("GetBookmarks")
  }
  GetObjects() {
    console.log("GetObjects")
  }
  GetObject() {
    console.log("GetObject")
  }
  DestroyObject() {
    console.log("DestroyObject")
  }
  CreateObject() {
    console.log("CreateObject")
  }
  DestroySessionObject() {
    console.log("DestroySessionObject")
  }
  CreateSessionObject() {
    console.log("CreateSessionObject")
  }
  GetLineage() {
    console.log("GetLineage")
  }
  GetAppProperties() {
    console.log("GetAppProperties")
  }
  SetAppProperties() {
    console.log("SetAppProperties")
  }
  GetAppLayout() {
    console.log("GetAppLayout")
  }
  GetTableData() {
    console.log("GetTableData")
  }
  DoSave() {
    console.log("DoSave")
  }
  SetFetchLimit() {
    console.log("SetFetchLimit")
  }
  GetTextMacros() {
    console.log("GetTextMacros")
  }
  GetScript() {
    console.log("GetScript")
  }
  SetScriptBreakpoints() {
    console.log("SetScriptBreakpoints")
  }
  GetScriptBreakpoints() {
    console.log("GetScriptBreakpoints")
  }
  DoReload() {
    console.log("DoReload")
  }
  GetEmptyScript() {
    console.log("GetEmptyScript")
  }
  SetViewDlgSaveInfo() {
    console.log("SetViewDlgSaveInfo")
  }
  GetViewDlgSaveInfo() {
    console.log("GetViewDlgSaveInfo")
  }
  GetTablesAndKeys() {
    console.log("GetTablesAndKeys")
  }
  GetLocaleInfo() {
    console.log("GetLocaleInfo")
  }
  RemoveVariable() {
    console.log("RemoveVariable")
  }
  CreateVariable() {
    console.log("CreateVariable")
  }
  Forward() {
    console.log("Forward")
  }
  Back() {
    console.log("Back")
  }
  UnlockAll() {
    console.log("UnlockAll")
  }
  LockAll() {
    console.log("LockAll")
  }
  ClearAll() {
    console.log("ClearAll")
  }
  EvaluateEx() {
    console.log("EvaluateEx")
  }
  Evaluate() {
    console.log("Evaluate")
  }
  SetLooselyCoupledVector() {
    console.log("SetLooselyCoupledVector")
  }
  GetLooselyCoupledVector() {
    console.log("GetLooselyCoupledVector")
  }
  GetVariable() {
    console.log("GetVariable")
  }
  GetFieldDescription() {
    console.log("GetFieldDescription")
  }
  GetField() {
    console.log("GetField")
  }
}

class Global {
  constructor() {}

  EngineVersion() {}
}

// const methodConstructor = function(method, xQlikService) {
//   return function(...args) {
//     const { handle } = this

//     const [qResponse, setQResponse] = useState({ loading: true, response: null})

//     useEffect(() => {
//       if(handle !== null) {
//         handle.ask(method, ...args).subscribe(response =>
//           setQResponse(new DocClass({ }))
//           // setQResponse({
//           //   ...qResponse,
//           //   loading: false,
//           //   response,

//           // }))
//       }
//     })
//   }
// }

// const createQClass = qClass => {
//   return Object.entries(schema.services[qClass].methods).reduce((acc, [methodName, { responses }]) => {
//     const xQlikService = responses
//       ? responses.map(response => response["x-qlik-service"]).filter(xQlikService => xQlikService !== undefined)
//       : []

//     return {
//       ...acc,
//       [methodName]: xQlikService[0],
//     }
//   }, {})
// }

// const qClass = createQClass("Global")

// console.log(qClass)

// const { services } = schema

// const methodActionConstructor = function(method) {
//   return function(...args) {
//     const { handle } = this

//     const [qResponse, setQResponse] = useState({ loading: true, response: null })

//     useEffect(() => {
//       if (handle !== null) {
//         handle.ask(method, ...args).subscribe(response =>
//           setQResponse({
//             ...qResponse,
//             loading: false,
//             response,
//           })
//         )
//       }
//     }, [handle])

//     return qResponse
//   }
// }

// const qClasses = Object.entries(services).reduce((acc, qClass) => {
//   return {
//     ...acc,
//     [qClass[0]]: Object.entries(qClass[1].methods).reduce((acc, method) => {
//       const responses = method[1].responses
//       const xQlikService = responses
//         ? responses
//             .map(response => delve(response, "x-qlik-service"))
//             .filter(xQlikService => xQlikService !== undefined)
//         : []

//       // const xQlikServiceDefined = xQlikService.length > 0

//       return {
//         ...acc,
//         [method[0]]: { func: methodActionConstructor(method[0]), xQlikService: xQlikService[0] },
//         // [`use${method[0]}`]: xQlikServiceDefined
//         //   ? methodObjectCreatorConstructor(method[0], xQlikServiceDefined)
//         //   : methodActionConstructor(method[0]),
//       }
//     }, {}),
//   }
// }, {})

// const methodObjectCreatorConstructor = function(method, classType) {
//   return function(...args) {
//     const { handle } = this

//     const [qHandle, setQHandle] = useState({ loading: true, handle: null })

//     useEffect(() => {
//       if (handle !== null) {
//         handle.ask(method, ...args).subscribe(response =>
//           setQHandle({
//             ...qHandle,
//             loading: false,
//             handle: response,
//             ...qClasses[classType],
//           })
//         )
//       }
//     }, [handle])

//     return qHandle
//   }
// }

// const qClassesWithObjectCreators = Object.entries(qClasses).reduce((acc, qClass) => {
//   return {
//     ...acc,
//     [qClass[0]]: Object.entries(qClass[1]).reduce((acc, method) => {
//       return {
//         ...acc,
//         [`use${method[0]}`]: method[1].xQlikService
//           ? methodObjectCreatorConstructor(method[0], method[1].xQlikService)
//           : method[1].func,
//       }
//     }, {}),
//   }
// }, {})

// console.log(qClassesWithObjectCreators)

export default ({ config }) => {
  // const [engine, setEngine] = useState({
  //   loading: true,
  //   handle: null,
  //   ...qClassesWithObjectCreators.Global,
  // })
  // useEffect(() => {
  //   const session = connectSession(config)
  //   const { global$ } = session
  //   global$.subscribe(globalHandle => setEngine({ ...engine, loading: false, handle: globalHandle }))
  //   return () => session.close()
  // }, [])
  // return engine
}
