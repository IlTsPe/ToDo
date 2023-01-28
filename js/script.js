const todoList = document.querySelector('#todo-list'),
	todoForm = document.querySelector('#todo-form'),
	todoInput = document.querySelector('#todo-input'),
	helper = document.querySelector('.helper');

todoForm.addEventListener('submit', submitForm);

let tasks = []; //! Сюда будут записываться данные, let тк используем filter при удалении

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
};

tasks.forEach((task) => {
	createLiBtn(task)
})

checkEmptyList()

function submitForm(e) {
	e.preventDefault();
	const regEx = /\s+/;
	const inputValue = todoInput.value;

	if (inputValue == '' || inputValue == inputValue.match(regEx)) {
		helper.classList.remove('helper-none');
		todoInput.classList.add('input-invalid');
		setTimeout(() => {
			todoInput.classList.remove('input-invalid');
			helper.classList.add('helper-none');
		}, 1500);
	} else {
		//todo Добавление элементов
		const taskText = inputValue;

		const newTask = {
			id: Date.now(),
			text: taskText
		}

		tasks.push(newTask)
		saveToLocalSt()

		createLiBtn(newTask)

		todoInput.value = '';
	}
}

function createLiBtn(obj) {
	const li = document.createElement('li');
	const span = document.createElement('span');
	li.setAttribute('id', `${obj.id}`); //! чтобы получить значение именно из объекта
	li.classList.add('new-item');
	span.innerHTML = `${obj.text}`; //! чтобы получить значение именно из объекта
	li.append(span);
	todoList.append(li);
	checkEmptyList()

	//todo Удаление элементов
	const deletBtn = document.createElement('button');
	deletBtn.setAttribute('role', 'button');
	deletBtn.innerHTML = "<i class='bx delet-icon bxs-trash-alt'></i>";
	deletBtn.classList.add('delete-btn');
	li.append(deletBtn);

	deletBtn.addEventListener('click', function deleteElement() {
		const parentNode = this.closest('li'); //! в перм, тк нужно вызывать много раз этот метод
		parentNode.remove();

		const parentId = Number(parentNode.id); //! обернули в Number, тк строгое сравнение в if стравнивает и тип данных, а мы тут иначе получим строку

		tasks = tasks.filter((task) => task.id !== parentId);
		saveToLocalSt()
		checkEmptyList()
	});
}

function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `<li class="empty-item">пусто</li>`;
		todoList.insertAdjacentHTML("beforeend", emptyListHTML);
	}

	if (tasks.length > 0) {
		const emptyListEl = document.querySelector('.empty-item');
		emptyListEl ? emptyListEl.remove() : null; //! если он его не найдет, то вернет null
	}
}

function saveToLocalSt() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}