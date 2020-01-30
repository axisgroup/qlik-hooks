# Initializing API Calls

You've seen in previous examples how we can call API methods with parameters, but what if we want to initialize an API call definition, but only call it when specific user interaction requires it? Let's walk through an example of when this may be the case.

## ListObject

Let's progress the examples we've seen so far to create a GenericObject in a Qlik App that contains a ListObject

```jsx
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/Global"
import { useCreateSessionObject } from "qlik-hooks/Doc"

const Component = () => {
  const engine = useConnectEngine({
    host: "localhost",
    port: 4848,
    isSecure: false,
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

  return <div>component content</div>
}
```

We can fetch data from the ListObject using the GetLayout method, and display it as an unordered list in the jsx we return

```jsx
//...
import { useState, useEffect } from "react"
import { useGetLayout } from "qlik-hooks/GenericObject"

const Component = () => {
  //...

  const listObjectLayout = useGetLayout(listObject, { params: [] })

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
          >
            {listItem.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

The next logical piece we would want to add to our ListObject is an ability to make selections when a user clicks on a list item. To do that, we need to initialize the `useSelectListObjectValues` method on our ListObject, but there's one problem, by passing in a params input, we're effectively calling the selection function with an initial state. Instead, we want to initialize the api method, and expose a way for that same method to be called whenever a user interacts with the list.

We can do this by not including a params option to the Qlik Hook, and instead utilizing the `call` method on the object we create from the hook.

```jsx
//...
import { useGetLayout, useSelectListObjectValues } from "qlik-hooks/GenericObject"

const Component = () => {
  //...

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

By doing this we don't select any values in our ListObject until a user clicks on the list.

This gives us an _almost_ fully working ListObject, but we still aren't getting the selection state of the list items to show. Check out the next section [Invalidations](./invalidations) to see why.
