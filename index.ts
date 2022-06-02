/**
 * Wrapper around ServiceManager for vue
 * This just loads service manager and install it into vue
 *
 * Services are then available by using useServices() in components
 */
 import createWalter from '@genario/walterjs'
 import type { WalterService, WalterConfig } from '@genario/walterjs'
 import { inject } from 'vue'
 
 import { App as Application } from 'vue'
 
 export type { WalterService, WalterConfig }
 
 /**
  * Allow access to any service in vue
  */
 export const useServices = (): { [k: string]: WalterService } | undefined => {
   return inject('services')
 }
 
 export const useService = (name: string, method: string = 'use') => {
   const services = useServices()
   if (!services) {
     throw new Error('Walter services are not loaded yet')
   }
 
   if (name in services === false) {
     throw new Error(`Unknow walter service: ${name}`)
   }
 
   if (!method.startsWith('use')) {
     throw new Error('Walter service use() api methods must start with "use"')
   }
 
   // method was not found for the service
   if (!services[name]?._self?.[method]) {
     // if default "use" method is requested, we just return the service
     if (method === 'use') {
       return services[name]
     }
     // otherwise we can't continue
     throw new Error(`Service: ${name} doesn’t provide injection ${method}()`)
   }
   // call use*() method on the service
   return services[name]._self[method](services[name])
 }
 
 /**
  * Re-export as a convenience
  */
 export { importHelper } from '@genario/walterjs'
 
 export default {
   install: async (
     app: Application,
     modules: Array<WalterService>,
     config: { [k: string]: any }
   ) => {
     // Load services from /services/ directory, in order
     const walter = await createWalter(modules, app, config)
     app.config.globalProperties.$services = walter.services
     app.provide('services', walter.services)
   },
 }