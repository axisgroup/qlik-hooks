import React from "react"
import { useConnectEngine } from "qlik-hooks"

const config = {
  // host: "senses.axisgroup.com",
  host: "172.16.84.100",
  isSecure: true,
}

const Component = () => {
  const engine = useConnectEngine(config)
  console.log(engine)

  return <div>Component Content</div>
}

export default Component
