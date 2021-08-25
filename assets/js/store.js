import { createStore } from './core.js'
import reducer from './reducer.js'
// store.js // Thằng này chứa dữ liệu để đưa ra view thôi
const { attach, connect, dispatch } = createStore(reducer)

window.dispatch = dispatch

export { attach, connect }