import html from '../core.js'
import TodoItem from '../component/TodoItem.js'
import { connect } from '../store.js'

function TodoList({ todos, filter, filters }) {
    return html `
        <section class="main">
             <input id="toggle-all" class="toggle-all" 
              onchange="dispatch('toggleAll',this.checked)" type="checkbox"
              ${todos.every(filters.Completed) && 'checked'}
              >
             <label for="toggle-all"  >Mark all as complete</label>
                <ul class="todo-list">
                  ${todos
                    .filter(filters[filter])
                    .map((todo,index) =>
                     TodoItem({ todo,index})
                     )}
                </ul>
        </section>
    `
}
export default connect()(TodoList)