# Toggle Sessions

```javascript
import React, { useEffect, useState } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/dist/Global"
import { useGetAppProperties, useGetTablesAndKeys } from "qlik-hooks/dist/Doc"

// Define the configuration for your session
const configs = [
  {
    host: "sense.axisgroup.com",
    isSecure: true,
    appname: "aae16724-dfd9-478b-b401-0d8038793adf",
  },
  {
    host: "sense.axisgroup.com",
    isSecure: true,
    appname: "3a64c6ff-94b4-43e3-b993-4040cf889c64",
  },
]

const Component = () => {
  // Initialize 2 sessions, 1 for each app
  // The QIX engine does not allow more than 1 app to be open on a single session.
  // for that reason, we need to create a session for each app we want to utilize
  const sessions = [useConnectEngine(configs[0]), useConnectEngine(configs[1])]

  // Id state of the session we are connected to
  const [sessionId, setSessionId] = useState(0)
  // Session state currently connected
  const [session, setSession] = useState(sessions[0])

  // When sessionId updates, or the handle of the sessions update..
  useEffect(() => {
    // set the session to currently selected ID
    setSession(sessions[sessionId])
  }, [sessionId, sessions[0], session[1]])

  // OpenDoc with the appname of the selected session
  const app = useOpenDoc(session, { params: [configs[sessionId].appname] })

  // Get app props
  const appProps = useGetAppProperties(app, { params: [] })

  // App title state
  const [appTitle, setAppTitle] = useState("-")
  // when appProps updates..
  useEffect(() => {
    // Set the title if available
    if (appProps.qResponse !== null) setAppTitle(appProps.qResponse.qTitle)
    else setAppTitle("-")
  }, [appProps])

  // Get App Tables and Keys
  const tablesAndKeys = useGetTablesAndKeys(app, {
    params: [{ qcx: 1000, qcy: 1000 }, { qcx: 0, qcy: 0 }, 30, true, false],
  })

  // App fields state
  const [appFieldList, setAppFieldList] = useState([])
  // when tablesAndKeys updates..
  useEffect(() => {
    // set appFieldList with table data if available
    if (tablesAndKeys.qResponse !== null) {
      setAppFieldList(
        [].concat(
          ...tablesAndKeys.qResponse.qtr.map(table =>
            table.qFields.map(field => ({
              table: table.qName,
              field: field.qName,
            }))
          )
        )
      )
    } else setAppFieldList([])
  }, [tablesAndKeys])

  return (
    <div>
      <button onClick={() => setSessionId(sessionId * -1 + 1)}>Switch Session</button>
      <div>Title: {appTitle}</div>
      <div>
        <table>
          <tbody>
            {appFieldList.map((row, i) => (
              <tr key={i}>
                <td>{row.table}</td>
                <td>{row.field}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```
