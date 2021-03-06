import React, { useState, useEffect } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/dist/Global"
import { useCreateSessionObject } from "qlik-hooks/dist/Doc"
import { useGetLayout, useSelectListObjectValues, useApplyPatches } from "qlik-hooks/dist/GenericObject"

const appname = "aae16724-dfd9-478b-b401-0d8038793adf"

// Define the configuration for your session
const config = {
  host: "sense.axisgroup.com",
  isSecure: true,
  appname,
}

const Component = () => {
  // Connect to the engine
  const engine = useConnectEngine(config)

  // Open an app
  const app = useOpenDoc(engine, { params: [appname] })

  // Create GenericObject with formula
  const obj = useCreateSessionObject(app, {
    params: [
      {
        qInfo: { qType: "my-object" },
        myValue: { qValueExpression: "=avg(petal_length)" },
      },
    ],
  })

  // Get the layout of the GenericObject to calculate the value
  const objLayout = useGetLayout(obj, { params: [], invalidations: true })

  // Create a GenericObject with a list object for the field "species"
  const listBox = useCreateSessionObject(app, {
    params: [
      {
        qInfo: { qType: "my-listbox" },
        qListObjectDef: {
          qDef: {
            qFieldDefs: ["species"],
          },
          qInitialDataFetch: [
            {
              qTop: 0,
              qLeft: 0,
              qWidth: 1,
              qHeight: 100,
            },
          ],
        },
      },
    ],
  })

  // Get the listbox layout
  const listBoxLayout = useGetLayout(listBox, { params: [], invalidations: true })

  // Create selection object that can be called from user input
  const listBoxSelect = useSelectListObjectValues(listBox)

  // Dropdown state
  const [selectedField, setSelectedField] = useState("species")
  const handleChangeDropdown = e => {
    setSelectedField(e.target.value)
  }

  // Change the dimension value
  const applyPatches = useApplyPatches(listBox)
  useEffect(() => {
    applyPatches.call([
      {
        qPath: "/qListObjectDef/qDef/qFieldDefs/0",
        qOp: "replace",
        qValue: JSON.stringify(selectedField),
      },
    ])
  }, [selectedField])

  return (
    <div>
      {/* Display calculated value */}
      <div>The average petal length is {objLayout.qResponse !== null ? objLayout.qResponse.myValue : ""}</div>
      {/* listbox field selector */}
      <select selected={selectedField} onChange={handleChangeDropdown}>
        <option value="species">Species</option>
        <option value="petal_width">Petal Width</option>
        <option value="sepal_width">Sepal Width</option>
      </select>
      {/* display listbox items */}
      <div>
        {listBoxLayout.qResponse !== null ? (
          <ul>
            {listBoxLayout.qResponse.qListObject.qDataPages[0].qMatrix.map(listItem => (
              <li
                key={listItem[0].qElemNumber}
                className={listItem[0].qState}
                data-qno={listItem[0].qElemNumber}
                // select item when click
                onClick={() => listBoxSelect.call("/qListObjectDef", [listItem[0].qElemNumber], true)}
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
