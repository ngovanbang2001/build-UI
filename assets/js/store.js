import { createStore } from './core.js'
import reducer from './reducer.js'
import withLogger from './logger.js'
// store.js // Thằng này chứa dữ liệu để đưa ra view thôi
const { attach, connect, dispatch } = createStore(withLogger(reducer))
window.dispatch = dispatch

export { attach, connect }