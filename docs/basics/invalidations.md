# Invalidations

There are some API calls we make that return the state of certain objects within a Qlik document. Qlik's associative engine allows us to update the selection state of the document, and when this happens, we want to receive an updated version of any object states that may have changed.

Looking back the last example in [Initializing API Calls](./initializing-api-calls), we were able to fetch the data of our ListObject through the GetLayout method, but if we make a selection, we need to re-fetch the data by calling GetLayout again

```jsx
listObjectLayout.call()
```

But there is an easier method. Qlik Hook action methods (this is, methods that dont' create and return and object handle) have an input option that allows you to re-call the api when an invalidation event occurs

```jsx
//...
const listObjectLayout = useGetLayout(listObject, { params: [], invalidations: true })
//...
```

Taking this and applying it to the last exmaple gives us a fully functioning ListObject that updates automatically on selection

```jsx
import React, { useEffect, useState } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/dist/Global"
import { useCreateSessionObject } from "qlik-hooks/dist/Doc"
import { useSelectListObjectValues, useGetLayout } from "qlik-hooks/dist/GenericObject"

const Component = () => {
  const engine = useConnectEngine({
    host: "localhost",
    port: 19076,
  })

  const doc = useOpenDoc(engine, { params: ["Executive Dashboard.qvf"] })

  const listObject = useCreateSessionObject(doc, {
    params: [
      {
        qInfo: { qType: "listbox" },
        qListObjectDef: {
          qDef: { qFieldDefs: ["Region"] },
          qInitialDataFetch: [{ qWidth: 1, qHeight: 100 }],
        },
      },
    ],
  })

  const listObjectLayout = useGetLayout(listObject, { params: [], invalidations: true })

  const [list, setList] = useState([])
  useEffect(() => {
    if (listObjectLayout.qResponse !== null) {
      const qMatrix = listObjectLayout.qResponse.qListObject.qDataPages[0].qMatrix

      setList(
        qMatrix.map(row => ({
          label: row[0].qText,
          value: row[0].qElemNumber,
          state: row[0].qState,
        }))
      )
    }
  }, [listObjectLayout])

  const selectListObjectValues = useSelectListObjectValues(listObject)

  const handleListObjectSelection = value => {
    selectListObjectValues.call("/qListObjectDef", [value], true)
  }

  return (
    <div>
      <ul>
        {list.map(listItem => (
          <li
            key={listItem.value}
            value={listItem.value}
            style={{
              backgroundColor: listItem.state === "S" ? "#2294f2" : listItem.state === "X" ? "#b1c0c7" : "#fff",
            }}
            onClick={() => handleListObjectSelection(listItem.value)}
          >
            {listItem.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
```
