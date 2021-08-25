import html from '../core.js'
import { connect } from '../store.js'
// app.js // Ông này là để xử lí html để xuất khẩu thôi
const connector = connect()


// Hàm này có tác dụng tạo ra HTML đã qua xử lí để chuẩn bị cho xuất khẩu
function App({ cars }) {
    return html `
    <ul>
    ${cars.map(car => `<li>${car}</li>`)}
    </ul>
    
    <button onclick="dispatch('ADD', 'Ferrari')">Add car</button>
    `
}

console.log(connector) // Thằng này các bạn dễ nhầm lần nè, chú ý trong bài, khi import App từ component/App.js
				// thì thực ra là import connector(App) với tên là App chứ không phải là App đâu

export default connector(App)