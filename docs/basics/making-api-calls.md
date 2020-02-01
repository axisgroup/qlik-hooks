# Making API Calls

When we have a Qlik Sense Object Handle, we can call any API method from the Class the handle belongs to. When we connect to the engine and receive an object back, it contains a handle of the Global class type. We can then call any Global Class API method with our object.

Remember, whenever we use a Qlik Hook, it must follow the rules of [React Hooks](https://reactjs.org/docs/hooks-rules.html). That means Qlik Hooks should be called from within a React function component, or another custom React hook, and should never be called from inside a loop, a condition block, or a nested function.

## Using an API Qlik Hook

Say we have connected to Qlik Engine:

```jsx
const Component = () => {
  const engine = useConnectEngine({
    host: "sense.axisgroup.com",
    isSecure: true,
  })

  return <div>...component content</div>
}
```

The `engine` object we get back contains a handle of the Global class type that can be used in conjunction with any of the Global API methods. Let's see how we can use this to get the version of our Qlik Engine. First, we need to import the EngineVersion API hook method from the qlik-hooks library

```jsx
import { useEngineVersion } from "qlik-hooks/Global"
```

Now we can run the useEngineVersion hook in our React component, passing in the Handle object we are running the method against

```jsx
const Component = () => {
  const engineVersion = useEngineVersion(engine)
  console.log(engineVersion)
}
```

We can see this object contains 3 properties: the loading state, the response from the Qlik Engine, and a function to actually call the api method. At this point in time, the API call has been set up, but the request has not yet been sent to the engine. We can also see that qResponse is null, again because we have not yet sent the request. Let's introduce a method for an end user to call the api method.

```jsx
const Component = () => {
  useEffect(() => {
    console.log(engineVersion)
  }, [engineVersion])

  return <button onClick={() => engineVersion.call()}>Get Engine Version</button>
}
```

When we interact with the button, the EngineVersion method is called, and the engineVersion object temporarily goes into a loading state (with loading set to true) until it finally receives and stores the response from Qlik in the qResponse property.

This is a good start, but what if we don't want to require user interaction to call this API method. Instead we want to just call this method once and have its value. This can be done by calling the useConnectEngine hook with a second input, an object containing the params array that gets passed to the engine with the api call.

```jsx
const Component = () => {
  const engineVersion = useEngineVersion(engine, { params: [] })
  console.log(engineVersion)

  return null
}
```

Initially, engineVersion is set to the same state we see in the first example without params initialization, but this time the hook has sent the api request to the engine already, and will soon after get the response back. Initializing an API hook with params doesn't necessarily mean the method call has to be one-and-done. We can still use the call function on the engineVersion object to keep calling the api method at any point in the future.

## Asynchronous Object Calls

It is important to understand that the API method calls occuring in Qlik Hooks happen asynchronously. When we call a method such as `useEngineVersion`, a request is sent to the engine asking for the version, but before the version is returned, our code will continue to run. Because of this, we can't do anything with our engineVersion object until its state updates with the qResponse we need.

If inside a React component we were to run this code:

```jsx
const Component = () => {
  const engineVersion = useEngineVersion(engine, { params: [] })

  return <div>{engineVersion.qResponse.qComponentVersion}</div>
}
```

we would get an error because the qResponse property on engineVersion initially has a value of null. It's not until a short time later that the engineVersion state gets updated with the response from the engine.

We instead need to implement our code to check for a valid qResponse before trying to use the data within.

```jsx
const Component = () => {
  const engineVersion = useEngineVersion(engine, { params: [] })

  return engineVersion.qResponse !== null ? (
    <div>{engineVersion.qResponse.qComponentVersion}</div>
  ) : (
    <div>loading...</div>
  )
}
```

## Connecting Handles

The previous section demonstrates an example of calling an Action Qlik Hook, but what if we want to connect to a new Handle object that has its own set of class API methods. This is necessary if we want to open a Qlik Application, or create new objects within an app that calculate data tables (take a look at the [QAE Class Hierarchy](../introduction/qae-hierarchy.html) for a refresher on class layouts).

Connecting to an application would look something like this

```jsx
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/Global"

const Component = () => {
  const engine = useConnectEngine({
    host: "sense.axisgroup.com",
    isSecure: true,
  })

  const doc = useOpenDoc(engine, { params: ["aae16724-dfd9-478b-b401-0d8038793adf"] })

  return <div>component content</div>
}
```

Now, we have a doc object that contains a handle of the type Doc, and we can run any Doc API class.
