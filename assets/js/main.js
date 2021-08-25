import { attach } from './store.js'
import App from './component/app.js'
// App đây không phải là App ở trên mà phải là connector(App)
attach(App, document.getElementById('root'))