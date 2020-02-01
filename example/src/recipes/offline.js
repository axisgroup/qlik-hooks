import React, { useEffect, useState, useRef } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/dist/Global"
import { useCreateSessionObject } from "qlik-hooks/dist/Doc"
import { useGetLayout, useSelectListObjectValues } from "qlik-hooks/dist/GenericObject"

// Define the configuration for your session
const appname = "aae16724-dfd9-478b-b401-0d8038793adf"
const config = {
  host: "sense.axisgroup.com",
  isSecure: true,
  appname,
}

const Component = () => {
  // Network Status state
  const [networkOnline, setNetworkOnline] = useState(navigator.onLine)

  // Set lostConnection trigger so re-connect only occurs after we've lost connection
  const lostConnection = useRef(!navigator.onLine)

  // Set network status on change
  window.ononline = () => setNetworkOnline(true)
  window.onoffline = () => {
    setNetworkOnline(false)
    lostConnection.current = true
  }

  // connect to engine
  const engine = useConnectEngine(config)

  // Reconnect to engine if we've lost connection and then came back online
  useEffect(() => {
    if (lostConnection.current && networkOnline) engine.call(config)
  }, [networkOnline, lostConnection])

  // open doc
  const app = useOpenDoc(engine, { params: [appname] })

  // create session object
  const obj = useCreateSessionObject(app, {
    params: [
      {
        qInfo: { qType: "custom" },
        value: { qValueExpression: "=avg(petal_length)" },
      },
    ],
  })

  // get object layout
  const objLayout = useGetLayout(obj, { params: [], invalidations: true })

  // object value state
  const [value, setValue] = useState("-")
  useEffect(() => {
    if (objLayout.qResponse !== null) setValue(objLayout.qResponse.value)
    else setValue("-")
  }, [objLayout])

  // species listbox
  const listbox = useCreateSessionObject(app, {
    params: [
      {
        qInfo: { qType: "my-listbox" },
        qListObjectDef: {
          qDef: { qFieldDefs: ["species"] },
          qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 1, qHeight: 100 }],
        },
      },
    ],
  })

  // listbox layout
  const listboxLayout = useGetLayout(listbox, { params: [], invalidations: true })

  // listbox select
  const listboxSelect = useSelectListObjectValues(listbox)

  return (
    <div>
      <div>Network Status: {networkOnline ? "Online" : "Offline"}</div>
      <div>Value: {value}</div>
      {/* display listbox items */}
      <div>
        {listboxLayout.qResponse !== null ? (
          <ul>
            {listboxLayout.qResponse.qListObject.qDataPages[0].qMatrix.map(listItem => (
              <li
                key={listItem[0].qElemNumber}
                className={listItem[0].qState}
                data-qno={listItem[0].qElemNumber}
                // select item when click
                onClick={() => listboxSelect.call("/qListObjectDef", [listItem[0].qElemNumber], true)}
              >
                {listItem[0].qText}
              </li>
            ))}
          </ul>
        ) : (
          "loading..."
        )}
      </div>
    </div>
  )
}

export default Component
