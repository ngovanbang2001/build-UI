import html from '../core.js'
import { connect } from '../store.js'

function TodoItem({ todo, index, editIndex }) {

    return html `
    <li class="${todo.isCompleted && "completed"} ${editIndex===index && "editing"} ">
        <div class="view">
            <input class="toggle" onchange="dispatch('toggle',${index})"  type="checkbox" ${todo.isCompleted && "checked"} >
            <label ondblclick="dispatch('doubleEdit',${index})">${todo.title}</label>
            <button class="destroy" onclick="dispatch('destroy',${index})"></button>
        </div>
        <input class="edit" value="${todo.title}"
        onkeyup="event.keyCode === 13   && dispatch('completedEdit',this.value.trim()) || event.keyCode === 27 && dispatch('cancelEdit') "
        onblur="dispatch('completedEdit',this.value.trim())"
        >
    </li>   
    `
}
export default connect()(TodoItem)