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
	console.log(task)
	const li = document.createElement('li');
	const span = document.createElement('span');
	const taskText = task.text;
	span.textContent = taskText;
	li.setAttribute('id', `${task.id}`);
	li.classList.add('new-item');
	li.append(span);
	todoList.append(li);
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

})

checkEmptyList()

function submitForm(e) {
	e.preventDefault();
	if (todoInput.value == '') {
		helper.classList.remove('helper-none');
		setTimeout(() => {
			helper.classList.add('helper-none');
		}, 1500);
	} else {
		//todo Добавление элементов
		// item.classList.add('none');

		const taskText = todoInput.value;

		const newTask = {
			id: Date.now(),
			text: taskText
		}

		tasks.push(newTask)
		saveToLocalSt()

		const li = document.createElement('li');
		const span = document.createElement('span');
		li.setAttribute('id', `${newTask.id}`);
		li.classList.add('new-item')
		span.innerHTML = newTask.text; //! чтобы получить значение именно из объекта
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

			// первый вар. удаления из массива
			// const index = tasks.findIndex((task) => task.id === parentId); // упрощенная запись if
			// if (task.id === parentId)// вот это строгое сравнение
			// 	return true
			// }
			// tasks.splice(index, 1)

			//! второй вар. удаления из массива через filter
			tasks = tasks.filter((task) => task.id !== parentId);
			saveToLocalSt()
			// console.log(task)

			// if (todoList.children.length == 1) {
			// 	item.classList.remove('none');
			// }
			checkEmptyList()
		});
		todoInput.value = '';
	}
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