# Connect to an Engine

```javascript
// Import the useConnectEngine hook
import React from "react"
import { useConnectEngine } from "qlik-hooks"

// Define the configuration for your session
const config = {
  host: "sense.axisgroup.com",
  isSecure: true,
}

const Component = () => {
  // Call useConnectEngine with the config to produce a Global engine object
  const engine = useConnectEngine(config)

  return <div>Component Content</div>
}
```
