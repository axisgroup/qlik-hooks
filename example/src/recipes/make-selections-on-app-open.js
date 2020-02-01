import { useConnectEngine } from "qlik-hooks"
import { useOpenDoc } from "qlik-hooks/dist/Global"
import { useGetField } from "qlik-hooks/dist/Doc"
import { useSelect } from "qlik-hooks/dist/Field"

const appname = "aae16724-dfd9-478b-b401-0d8038793adf"

// Define the configuration for your session
const config = {
  host: "sense.axisgroup.com",
  isSecure: true,
  appname,
}

const Component = () => {
  // Connect to the engine
  const engine = useConnectEngine(config)

  // Open an app
  const app = useOpenDoc(engine, { params: [appname] })

  // GetField API
  const speciesField = useGetField(app, { params: ["species"] })
  const petalLengthField = useGetField(app, { params: ["petal_length"] })

  // Select API
  // Qlik Hooks internally wait for the handle to be defined before requesting
  // the method
  const speciesSelect = useSelect(speciesField, { params: ["setosa"] })
  const petalLengthSelect = useSelect(petalLengthField, { params: [">2"] })

  return null
}

export default Component
