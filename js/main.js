const todoForm = document.querySelector(".form");
const formInput = document.querySelector(".form>input");
const formButton = document.querySelector('.form>button');
const listItems = document.querySelector(".list-items");

let todoList = {};

function animeFormButton(button) {
    button.classList.add('formButton-active');
    setTimeout(() => {
        button.classList.remove('formButton-active')
    }, 500)
}

function trash() {
    this.parentNode.style.opacity = 0;
    const key = this.parentNode.getAttribute('data-key');
    setTimeout(() => {
        this.parentNode.remove();
        delete todoList[key];
        saveHTML();
    }, 600);
}

function check() {
    this.parentNode.classList.toggle('flip');
    
    this.innerHTML = this.innerHTML === '✔️' ? '♻️' : '✔️';
    
    const key = this.parentNode.getAttribute('data-key');
    todoList[key].checked = !todoList[key].checked;
    
    saveHTML();
}

function saveHTML() {
    window.localStorage.setItem('data', JSON.stringify(todoList))
}

function loadHTML() {
    if(!window.localStorage.getItem('data')) {
        return;
    };
    
    const data = JSON.parse(window.localStorage.getItem('data'));
    todoList = data;
    
    Object
        .keys(todoList)
        .map(key => createHTML(todoList[key], key));
    console.log(Object.keys(todoList));
}

function createHTML(todo, key) {
    if(!todo.todo) return;
    
    const html = `
        <span>${todo.todo}</span>
        <button name="trash" class="trash">🗑️</button>
        <button name="check" class="check">${todo.checked ? '♻️' : '✔️'}</button>
    `;
    
    const li = document.createElement('li');
    li.classList.add('item', todo.checked ? 'flip' : null);
    li.setAttribute('data-key', key);
    li.innerHTML = html;
    listItems.insertBefore(li, listItems.firstChild);
    
    li.children.trash.onclick = trash;
    li.children.check.onclick = check;
}

function createItem(event) {
    event.preventDefault();
    
    animeFormButton(formButton);
    
    const timestamp = Date.now();
    todoList[timestamp] = {
        todo: formInput.value,
        checked: false
    }
    
    createHTML(todoList[timestamp], timestamp);
    
    saveHTML();
    
    this.reset();
}

window.addEventListener('load', loadHTML);
todoForm.addEventListener('submit', createItem);
