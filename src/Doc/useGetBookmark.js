import { useState, useEffect } from "react";
import { take } from "rxjs/operators";

export default ({ handle }, { params }) => {
  const [qObject, setQObject] = useState({ loading: true, handle: null });

  useEffect(() => {
    if(handle !== null) {
      handle.ask("GetBookmark", ...params)
      .pipe(take(1))
      .subscribe(response => setQObject({ ...qObject, loading: false, handle: response }))
    }
  }, [handle]);

  return qObject;
}