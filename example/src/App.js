import React from "react"
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
  MakeLBSelections,
} from "./recipes"

const App = () => {
  return <MakeLBSelections />
}
export default App

// // Import the useConnectEngine hook and useEngineVersion hook
// import React from "react"
// import { useConnectEngine } from "qlik-hooks"
// import { useOpenDoc } from "qlik-hooks/dist/Global"
// import { useGetAppProperties, useSetAppProperties } from "qlik-hooks/dist/Doc"

// // Define the configuration for your session
// // const config = {
// //   host: "sense.axisgroup.com",
// //   isSecure: true,
// // }
// const config = {
//   host: "localhost",
//   port: 19076,
// }

// const Component = () => {
//   // Connect to the engine
//   const engine = useConnectEngine(config)

//   // Open an app
//   // const app = useOpenDoc(engine, { params: ["aae16724-dfd9-478b-b401-0d8038793adf"] })
//   const app = useOpenDoc(engine, { params: ["Executive Dashboard.qvf"] })

//   // Get the app properties
//   const appProps = useGetAppProperties(app, { params: [], invalidations: true })

//   // Create App Properties Set API caller
//   const setAppProps = useSetAppProperties(app)

//   // Display the app title when available
//   return (
//     <div>
//       <button onClick={() => setAppProps.call({ random: Math.random() })}>Set Random</button>
//       {appProps.qResponse !== null ? <div>{appProps.qResponse.random}</div> : <div>loading...</div>}
//     </div>
//   )
// }

// export default Component
