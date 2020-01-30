import React from "react"
import { useQlikContext } from "qlik-hooks"
import { useEngineVersion } from "qlik-hooks/dist/Global"

export default () => {
  const engine = useQlikContext()

  const engineVersion = useEngineVersion(engine, { params: [] })
  console.log(engineVersion)
  return engineVersion.qResponse !== null ? (
    <div>{engineVersion.qResponse.qComponentVersion}</div>
  ) : (
    <div>loading...</div>
  )
}
