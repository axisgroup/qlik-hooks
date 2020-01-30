# Core Concepts

In its backend, Qlik Hooks version 0.x uses RxQ to connect to the Qlik Associative Engine, and converts the outputs of those Reactive streams into React hook states. When we initialize a Qlik Hook, a state object is created for that method call. The corresponding API call is executed against the engine, and the state object gets set to the response received from the Qlik Engine. For a more in-depth review of how communication with the Qlik Engine, check out the [Engine Tutorial Series](http://opensrc.axisgroup.com/tutorials/engine/101.%20What%20is%20QIX%20and%20Why%20Should%20You%20Care.html).

## Qlik Engine API Hierarchy

In the Qlik Engine, there are 9 different types of Handles we can connect to, each with their own set of unique API methods, and organized as a hierarchy.

### Global

The Global class represents the full Qlik Engine we connect to, and defines the API methods that we can call to directly interact with the Engine. Requests such as getting all the documents on the engine, getting the version number of the engine we're connected to, and connecting to documents on the engine are all available.

Most methods in the Global class are Action methods, meaning they perform an action on the engine, but do not return to us a new object handle. However, there are 5 different methods that when called successfully, DO return back a reference to a new object handle on the engine:

- CreateDocEx
- GetActiveDoc
- OpenDoc
- CreateSessionApp
- CreateSessionAppFromApp

When any one of these methods is called, the engine will either create a new object on the engine or find the currently existing object we are requesting. It will then associate a new Handle with that object and return the handle back to us.

For example, say we know we have an app on the Qlik Engine called `Executive Dashboard.qvf`. If I run the OpenDoc method on my Global handle, and pass in the name of the doc I want to open, the engine will return back a handle associated with that document, and the new handle will have all of the `Doc` api methods available to call.

## Qlik Hook Types

In the Qlik Hooks library, there are 2 types of hook methods we can call - Handle creators and Actions. A Handle creator is an API method that creates a handle reference to another object on the Qlik Engine (see [Qlik Engine API Hierarchy](./#qlik-engine-api-hierarchy) for more details). Any other API method that doesn't create and return a handle to a new object is an Action hook.

## Handle Types

In the Qlik Engine, there are 9 different types of Handles we can connect to, each with their own set of unique API methods, and organized as a hierarchy.

When we connect to the Qlik Engine, objects that we connect to and interact with are organized in a hierarchy of objects. When first connecting to the engine,

## QAE Background

To better understand how this works, a basic understanding of how Qlik's Engine API works is helpful. The Engine API uses the JSON-RPC 2.0 protocol via a WebSocket for bidirectional communication. Messages can be sent to the Engine to initiate API calls. Responses can be received from the Engine. The Engine can also push messages without a preceding request.

The Engine has various classes that can be interacted with via API calls. For example, the Global class represents a session with the Engine and has API methods for getting the engine version and opening a document. A Doc class exists for applications that are opened. This class has methods for application operations like clearing selections and getting app properties.

When making an API call to the Engine, the call must tell the Engine what method to use and on what class instance it should be executed on. This class instance is referred to as a Handle. For exmaple, when opening a document in QAE, the Engine will return an identifier for a Handle for the opened document. The developer can then make API calls on this document by referencing this Handle identifier.

For a more guided and in-depth review of these concepts, try this [Engine Tutorial](http://playground.qlik.com/learn/engine-tutorial/101.%20What%20is%20QIX%20and%20Why%20Should%20You%20Care.html).

## Using RxQ to Make API Calls

In RxQ, Handles are provided with an `ask` method that will accept a method name and parameters and execute an API call to the Engine. An Observable is returned that will provide the response and complete. Method names are provided as strings; for convenience, the list of possible methods in the Engine API schema are provided as enums. [Let's use the "EngineVersion" method of Qlik's "Global" class as an example.](http://help.qlik.com/en-US/sense-developer/November2017/Subsystems/EngineAPI/Content/Classes/GlobalClass/Global-class-EngineVersion-method.htm)

To make this call in RxQ, we can import the `EngineVersion` enum from RxQ and use it with a Global Handle's `ask` method. The `EngineVersion` method takes no parameters, so we don't need any other inputs. This call will return an Observable that can make the API call and return the response. We can subscribe to this Observable to execute it and get the response.

```javascript
import { EngineVersion } from "rxq/Global"

const version$ = myGlobalHandle.ask(EngineVersion)

version$.subscribe(version => {
  console.log(`The version of the Engine is ${version}`)
})
```

If a method takes parameters, we just add them as arguments to our function call. For example, to open a document called "Sales.qvf", we would write:

```javascript
const app$ = myGlobalHandle.ask(OpenDoc, "Sales.qvf")
```

**This is essentially the core of RxQ: run a function that creates an Observable for a Qlik Engine API call response.**

You may be wondering how to get Handles from the Engine to feed into these functions. This process is detailed in the [Making API Calls](../basics/making-api-calls.md) section.
