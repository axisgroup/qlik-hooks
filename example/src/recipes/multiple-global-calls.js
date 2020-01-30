// Import the useConnectEngine hook and useEngineVersion hook
import React, { useState, useEffect } from "react"
import { useConnectEngine } from "qlik-hooks"
import { useEngineVersion, useGetDocList } from "qlik-hooks/dist/Global"

// Define the configuration for your session
const config = {
  host: "sense.axisgroup.com",
  isSecure: true,
}

const Component = () => {
  // Connect to the engine
  const engine = useConnectEngine(config)

  // Get the engine version
  const engineVersion = useEngineVersion(engine, { params: [] })

  // Get the Doc list
  const docList = useGetDocList(engine, { params: [] })

  // Convert qResponse to list
  const [list, setList] = useState([])
  useEffect(() => {
    if (docList.qResponse !== null) {
      setList(
        docList.qResponse.map(document => ({
          label: document.qDocName,
          value: document.qDocId,
        }))
      )
    }
  }, [docList])

  return (
    <div>
      {/* Display the Engine Version */}
      Engine Version:
      {engineVersion.qResponse !== null ? engineVersion.qResponse.qComponentVersion : "loading..."}
      {/* Display list of documents */}
      <div>
        Document List
        <ul>
          {list.map(listItem => (
            <li key={listItem.value} value={listItem.value}>
              {listItem.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Component
