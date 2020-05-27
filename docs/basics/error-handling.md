# Error Handling

Qlik Hook calls will return an error notification on the returned state if there is an error in the api call.

You can check the error state on the returned state's `error` property, null means there are no errors for the call, while an object will be defined on the error property if one has been returned from the engine

## Example

```jsx
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/dist/Global"

const engine = useConnectEngine({
  host: "localhost",
  port: 4848,
  isSecure: false,
})

const app = useOpenDoc(engine)

setTimeout(() => {
  app.call("non-existant-doc-id")
  // app.error has error object
}, 0)

setTimeout(() => {
  // real app id
  app.call("aae16724-dfd9-478b-b401-0d8038793adf")
  // app.error is equal to null
}, 1000)
```
