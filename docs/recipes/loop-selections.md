# Loop Through Selections in a Field

```javascript
import React, { useEffect, useState } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/Global"
import { useCreateSessionObject, useGetField } from "qlik-hooks/Doc"
import { useGetLayout } from "qlik-hooks/GenericObject"
import { useGetCardinal, useLowLevelSelect } from "qlik-hooks/Field"

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
        qSelectionObjectDef: {},
        myValue: {
          qValueExpression: "=avg(petal_length)",
        },
      },
    ],
  })

  // Get the layout of the GenericObject to calculate the value
  const objLayout = useGetLayout(obj, { params: [], invalidations: true })

  // Get a field
  const fld = useGetField(app, { params: ["species"] })

  // Get the cardinal values of the field
  const getCardinal = useGetCardinal(fld, { params: [] })
  // LowLevelSelect on field
  const lowLevelSelect = useLowLevelSelect(fld)

  // Set up state hook for the number of cardinal values
  const [cardinalValues, setCardinalValues] = useState(null)
  // set up state hook to control when the interval starts and stops running
  const [isRunning, setIsRunning] = useState(false)
  useEffect(() => {
    if (getCardinal.qResponse !== null) {
      // set the cardinal values
      setCardinalValues(getCardinal.qResponse)
      // set interval to start running
      setIsRunning(true)
    }
  }, [getCardinal])

  // set up state hook to count how many times interval has run
  const [intervalCount, setIntervalCount] = useState()

  // run effect on change of cardinalValues or isRunning
  useEffect(() => {
    // initialize interval id as null
    let intervalId = null

    // if cardinalValues set and isRunning
    if (cardinalValues !== null && isRunning) {
      // set interval and update the interval count
      intervalId = setInterval(() => {
        // if intervalCount is not set, initialize it to 0, else increment
        setIntervalCount(prevVal => (isNaN(prevVal) ? 0 : prevVal + 1))
      }, 1500)
    } else intervalId = null

    // clear interval when cleanig up hook
    return () => {
      if (intervalId !== null) clearInterval(intervalId)
    }
  }, [cardinalValues, isRunning])

  // run effect on change of intervalCount
  useEffect(() => {
    // Select field value as long as intervalCount is a number
    if (!isNaN(intervalCount)) lowLevelSelect.call([intervalCount], false)
    // stop interval after we've reached maximum cardinal values
    if (intervalCount >= cardinalValues - 1) setIsRunning(false)
  }, [intervalCount, cardinalValues])

  return (
    <div>
      {/* Display selections output */}
      Selections:
      {objLayout.qResponse !== null ? (
        objLayout.qResponse.qSelectionObject.qSelections.map((sel, i) => (
          <div key={i}>
            <strong>{sel.qField}:</strong> {sel.qSelected}
          </div>
        ))
      ) : (
        <div>loading...</div>
      )}
    </div>
  )
}
```
