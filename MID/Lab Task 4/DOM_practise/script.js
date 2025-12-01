document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const itemsLeft = document.getElementById('items-left');
    const clearCompletedBtn = document.getElementById('clear-completed');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    renderTodos();

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });
    todoList.addEventListener('click', handleTodoClick);
    filterBtns.forEach(btn => btn.addEventListener('click', handleFilter));
    clearCompletedBtn.addEventListener('click', clearCompleted);

    function addTodo() {
        const text = todoInput.value.trim();
        if (text === '') return;

        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        todos.push(newTodo);
        saveAndRender();
        todoInput.value = '';
    }

    function handleTodoClick(e) {
        const item = e.target;
        const todoItem = item.closest('.todo-item');
        if (!todoItem) return;

        const id = parseInt(todoItem.dataset.id);

        if (item.classList.contains('delete-btn') || item.closest('.delete-btn')) {
            deleteTodo(id);
        } else {
            toggleComplete(id);
        }
    }

    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveAndRender();
    }

    function toggleComplete(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveAndRender();
    }

    function clearCompleted() {
        todos = todos.filter(todo => !todo.completed);
        saveAndRender();
    }

    function handleFilter(e) {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderTodos(e.target.dataset.filter);
    }

    function saveAndRender() {
        localStorage.setItem('todos', JSON.stringify(todos));
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        renderTodos(activeFilter);
    }

    function renderTodos(filter = 'all') {
        todoList.innerHTML = '';

        let filteredTodos = todos;
        if (filter === 'active') {
            filteredTodos = todos.filter(todo => !todo.completed);
        } else if (filter === 'completed') {
            filteredTodos = todos.filter(todo => todo.completed);
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            if (todo.completed) li.classList.add('completed');
            li.dataset.id = todo.id;

            li.innerHTML = `
                <button class="check-btn">
                    <i class="fas ${todo.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                </button>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            todoList.appendChild(li);
        });

        updateItemsLeft();
    }

    function updateItemsLeft() {
        const count = todos.filter(todo => !todo.completed).length;
        itemsLeft.innerText = `${count} item${count !== 1 ? 's' : ''} left`;
    }
});
