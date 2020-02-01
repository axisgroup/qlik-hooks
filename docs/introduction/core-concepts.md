# Core Concepts

In its backend, Qlik Hooks version 0.3.x uses RxQ to connect to the Qlik Associative Engine, and converts the outputs of those Observable streams into React hook states. When we initialize a Qlik Hook, a state object is created for that method call. The corresponding API call is executed against the engine, and the state object gets set to the eventual response received from the Qlik Engine. For a more in-depth review of how communication with the Qlik Engine works, check out the [Engine Tutorial Series](https://opensrc.axisgroup.com/tutorials/engine/101.%20What%20is%20QIX%20and%20Why%20Should%20You%20Care.html).

## Qlik Hook Types

In the Qlik Hooks library, there are 2 types of hook methods we can call - **Handle** creators and **Actions**. A Handle creator is an API method that creates a reference handle to another object on the Qlik Engine. Every handle belongs to an API class that has its own set of API methods it can call. (See [Qlik Engine API Hierarchy](./qae-hierarchy.html) for more details). All other API methods that don't create and return a handle to a new object are Action hooks.

## Using Qlik Hooks to Make API Calls

In Qlik Hooks, a hook function is provided for each Qlik Engine API method, taking in a required handle object, and an optional second parameter defining the inputs for the method and whether the state should be updated when the handle becomes invalid.

Let's look at an example using the _EngineVersion_ method. After we get a Handle object returned to us from the _useConnectEngine_ hook, we can pass the engine handle into the _useEngineVersion_ hook, and we get back an object with data.

```jsx
const Component = () => {
  // Connect to the engine
  const engine = useConnectEngine(config)

  // Get the engine version
  const engineVersion = useEngineVersion(engine, { params: [] })
  console.log(engineVersion)

  return null
}
```

Here we set up an engineVersion state object that has the response from the Qlik Engine, loading state, and a call function to re-request the api and get an updated response.

The engineVersion state gets set asynchronously, so the data response won't be available until a response from the Engine is received. See [Making API Calls](../basics/making-api-calls.html) for more a more in-depth look at how to use Qlik Hooks, and check out the recipes section for more examples.

## Following the Rules of React Hooks

The Qlik Hooks library is essentially a library of custom React hooks, and must follow the same [rules as all other React Hooks](https://reactjs.org/docs/hooks-rules.html). That means:

- Don't call Qlik Hooks inside loops
- Don't call Qlik Hooks inside conditions
- Don't call Qlik Hooks inside nested functions

We should instead:

- Call Qlik Hooks from React function components
- Call Qlik Hooks from other custom Hooks
