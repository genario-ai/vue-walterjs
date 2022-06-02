
# Vue-walterjs

Vue-walterjs is a wrapper around [walterjs](https://github.com/genario-ai/walterjs#readme), a javascript service manager.


## Installation

```
yarn add @genario/vue-walterjs
```


## Usage

Loading:

```
import VueServiceManager, { importHelper } from '@genario/vue-walterjs'

// list of services as imported modules, using vite globEager
const modules = import.meta.globEager('../services/*/index.js')

// transform the raw import from vite as a sorted array
// using "boot" order from configuration
const services = importHelper(modules, config.services.boot)
app.use(VueServiceManager, services, config)
```

Calling:
```
// somewhere in a component setup
import { useService } from '@genario/vue-walterjs'

setup() {
    const router = useService('router')

}
```
