import React, { createContext, useContext } from "react"
import useConnectEngine from "./useConnectEngine"

/** QlikContext
 * Provides an object with access to an underlying RxQ session with an engine
 * returns
 * {
 *   global: Observable<Handle> - Global Handle
 *   doc: Observable<Handle> - Doc Handle
 *   close: function - tear down the session
 * } */
const QlikContext = createContext()
/** QlikProvider
 * Provides tree below with access to QlikContext, which will contain
 * Observables for accessing an underlying RxQ session with an engine */
export default ({ config, children }) => {
  const engine = useConnectEngine(config)

  // Return the children wrapped in the context provider
  return <QlikContext.Provider value={engine}>{children}</QlikContext.Provider>
}

export const useQlikContext = () => useContext(QlikContext)
