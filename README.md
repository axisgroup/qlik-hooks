# qlik-hooks

> qlik-hooks

[![NPM](https://img.shields.io/npm/v/qlik-hooks.svg)](https://www.npmjs.com/package/qlik-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save qlik-hooks
```

## Usage

```jsx
import React, { Component } from 'react'

import { useMyHook } from 'qlik-hooks'

const Example = () => {
  const example = useMyHook()
  return (
    <div>{example}</div>
  )
}
```

## License

MIT © [jbellizzi](https://github.com/jbellizzi)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
