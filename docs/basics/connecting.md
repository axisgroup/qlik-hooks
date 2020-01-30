# Connecting

To use Qlik Hooks in our application, we need to establish a session with the Qlik Engine over a WebSocket.

Qlik Hooks provides a hook called `useConnectEngine` that will establish the session with the Engine, and return back to us a handle to the Global instance of the engine. We can use the engine object we get back with any of the API methods defined in the Global class.

## Setup

`useConnectEngine` takes in a configuration object that creates the session. The config object should contain the following properties:

- **host** - _(String)_ Hostname of server
- **appname** - _(String)_ Scoped connection to app.
- **isSecure** - _(Boolean)_ If true uses wss and port 443, otherwise ws and port 80
- **port** - _(Integer)_ Port of connection, defaults 443/80
- **prefix** - _(String)_ Virtual Proxy, defaults to '/'
- **origin** - _(String)_ Origin of requests, node only.
- **rejectUnauthorized** - _(Boolean)_ False will ignore unauthorized self-signed certs.
- **headers** - _(Object)_ HTTP headers
- **ticket** - _(String)_ Qlik Sense ticket, consumes ticket on Connect()
- **key** - _(String)_ Client Certificate key for QIX connections
- **cert** - _(String)_ Client certificate for QIX connections
- **ca** - _(Array of String)_ CA root certificates for QIX connections
- **identity** - _(String)_ Session identity

## Usage

```jsx
import { useConnectEngine } from "qlik-hooks"

const engine = useConnectEngine({
  host: "localhost",
  port: 4848,
  isSecure: false,
})
```
