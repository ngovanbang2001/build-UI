import storage from "./util/storage.js"
const init = {
    //Lấy ra dữ liệu từ local storage đã được lưu
    todos: storage.get(),
    editIndex: null,
    filter: 'All',
    filters: {
        All: () => true,
        Active: todo => !todo.isCompleted,
        Completed: todo => todo.isCompleted,
    }
}
const actions = {
    ADD({ todos }, title) {
        if (title != "")
            todos.push({ title, isCompleted: false })
        storage.set(todos)
    },
    toggle({ todos }, index) {
        const todo = todos[index];
        todo.isCompleted = !todo.isCompleted;
        storage.set(todos)
    },
    toggleAll({ todos }, isCompleted) {
        todos.forEach(todo => todo.isCompleted = isCompleted)
        storage.set(todos)

    },
    destroy({ todos }, index) {
        todos.splice(index, 1)
        storage.set(todos)
    },
    filterActive(state, filter) {
        state.filter = filter;

    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.Active)
        storage.set(state.todos)
    },
    doubleEdit(state, index) {
        state.editIndex = index
    },
    completedEdit(state, value) {
        if (state.editIndex !== null && value != "")
            state.todos[state.editIndex].title = value
        state.editIndex = null
        storage.set(state.todos)
    },
    cancelEdit(state) {
        state.editIndex = null
        storage.set(state.todos)
    }
}
export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args)

    return state
}