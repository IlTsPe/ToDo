const todoList = document.querySelector('#todo-list'),
	todoForm = document.querySelector('#todo-form'),
	todoInput = document.querySelector('#todo-input'),
	item = document.querySelector('.rewq'),
	helper = document.querySelector('.helper');



todoForm.addEventListener('submit', submitForm);

function submitForm(e) {
	e.preventDefault();

	if (todoInput.value == '') {
		helper.classList.remove('helper-none');
		setTimeout(() => {
			helper.classList.add('helper-none');
		},1500);
	} else {
		item.classList.add('none');
		const taskText = todoInput.value;

		const li = document.createElement('li');
		li.classList.add('new-item')
		li.innerHTML = taskText;
		todoList.append(li);

		const deletBtn = document.createElement('button');
		deletBtn.setAttribute('role', 'button');
		deletBtn.innerText = 'Удалить';
		deletBtn.classList.add('delete-btn');
		li.append(deletBtn);

		deletBtn.addEventListener('click', function deleteElement() {
			this.closest('li').remove();
			if (todoList.childElementCount == 1) {
				item.classList.remove('none');
			}
		});
		todoInput.value = '';
	}
}