# Making API Calls

When we have a Qlik Sense Object Handle, we can call any API method from the Class the handle belongs to. When we connect to the engine and receive an object back, it contains a handle of the Global class. We can then call any Global Class API with our object.

Remember, whenever we use a Qlik Hook, it must follow the rules of [React Hooks](https://reactjs.org/docs/hooks-rules.html). That means Qlik Hooks should be called from within a React function component, or another custom React hook, and should never be called from inside a loop, a condition block, or a nested function.

## Using an API Qlik Hook

Say we have connected to Qlik Engine:

```jsx
const Component = () => {
  const engine = useConnectEngine({
    host: "localhost",
    port: 4848,
    isSecure: false,
  })

  return <div>...component content</div>
}
```

The `engine` object we get back contains a handle of the Global class type that can be used in conjunction with any of the Global API methods. Let's see how we can use this to get the version of our Qlik Engine. First, we need to import the EngineVersion API hook method from the qlik-hooks library

```jsx
import { useEngineVersion } from "qlik-hooks/Global"
```

Now we can run the useEngineVersion hook in our React component, passing in the object we are running the method against, and any input parameters the method takes

```jsx
const engineVersion = useEngineVersion(engine, { params: [] })
```

We can then use the contents of the `qResponse` property to access the engine version returned from the Qlik Engine. There's one problem though - the first time we receive the state of `engineVersion`, `qResponse` is equal to null! This is because API Hook calls are made asynchronously.

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

The previous section demonstrates an example of calling an action API Qlik Hook, but what if we want to connect to a different object that has its own set of Class API methods. This is necessary if we want to open a Qlik Application, or create new objects within an app that calculate data tables.

Connecting to an application would look something like this

```jsx
import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/Global"

const Component = () => {
  const engine = useConnectEngine({
    host: "localhost",
    port: 4848,
    isSecure: false,
  })

  const doc = useOpenDoc(engine, { params: ["Executive Dashboard.qvf"] })

  return <div>component content</div>
}
```

Now, we have a doc object that contains a handle of the type Doc, and we can run any Doc API class.
