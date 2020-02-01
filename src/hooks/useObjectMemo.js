import { useState, useEffect, useRef } from "react"
import { isEqual, functions, omit } from "lodash"

const removeObjFunctions = obj => {
  return Array.isArray(obj) ? obj.map(obj => omit(obj, functions(obj))) : omit(obj, functions(obj))
}

/** Hook to memoize objects. When using an object as a hook dependency,
 * React is unable to do prior state comparisons on deep nested values.
 * This hook will deep compare the prior state of the object to the
 * current state and update the memoized value if a change has been made */
export default obj => {
  /** Initialize object memo value */
  const [memoObj, setMemoObj] = useState(obj)

  /** Every render, compare, the current object to the prior object
   * stored in the prevObj ref. If there is a change, update memoObj */
  useEffect(() => {
    const oldObj = removeObjFunctions(prevObj.current)
    const newObj = removeObjFunctions(obj)
    if (!isEqual(oldObj, newObj)) setMemoObj(obj)
  }, [obj, prevObj])

  /** Initialize prevObj ref with the incoming object */
  const prevObj = useRef(obj)
  /** Update the prevObj ref with the incoming object */
  useEffect(() => {
    prevObj.current = obj
  }, [obj, prevObj])

  return memoObj
}
