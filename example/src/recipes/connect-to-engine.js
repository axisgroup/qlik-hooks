import React from "react"
import { useConnectEngine } from "qlik-hooks"

const config = {
  host: "sense.axisgroup.com",
  isSecure: true,
}

const Component = () => {
  const engine = useConnectEngine(config)

  return <div>Component Content</div>
}

export default Component
