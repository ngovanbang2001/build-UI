import html from '../core.js'
import Header from '../component/header.js'
import TodoList from '../component/TodoList.js'
import Footer from '../component/Footer.js'
import { connect } from '../store.js'

const connector = connect()


// Hàm này có tác dụng tạo ra HTML đã qua xử lí để chuẩn bị cho xuất khẩu
function App({ todos }) {

    return html `
    <section class="todoapp">
        ${Header()}
        ${todos.length>0 && TodoList()}
        ${todos.length>0 && Footer()}
    </section>
    `
}


export default connector(App)