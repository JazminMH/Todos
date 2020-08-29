import { Todo } from "../classes";
import { todoList } from '../index';

//referencias en el html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const filters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const creatTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado)?'completed':''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;

    //crear elemento html
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    //agregamos el primer hijo del div creado que es el li (elemento de lista)
    divTodoList.append(div.firstElementChild);

    //regresamos ese li
    return div.firstElementChild;
};

txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInput.value !== '') {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        creatTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    //event.target.localName devuelve el nombre del tag al cual hacemos click
    //ya sea un input, label, button, etc
    const nombreElemento = event.target.localName;

    //hace referencia al li, el cual vamos a eliminar
    const todoElemento = event.target.parentElement.parentElement;

    //Obtenemos el data-id, que es quien contiene el id del elemento
    const todoID = todoElemento.getAttribute('data-id')

    if (nombreElemento.includes('input')) {
        //Cambiamos el valor de completado de false o true
        todoList.marcarCompletado(todoID);

        //para agregar al clase que tacha el elemnto usamos classList y para cambiar o agregar una
        //clase usamos toggle con el nombre de la clase
        todoElemento.classList.toggle('completed');

    } else if (nombreElemento.includes('button')) {
        //En caso de que seleccione el boton de eliminar el to do,
        //llama al metodo de eliminar y le enviamos el id
        todoList.eliminarTodo(todoID);

        //elimnamos la referencia html del elemento con removeChild
        //y mandamos el elemento html a eliminar
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click', (event) => {
    //cuando haga click en el boton de "borrar completados"
    //llama a la funcion
    todoList.eliminarCompletados();

    //haremos referencia a todos los hijos que tiene el div (li)
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        //eliminamos el elemento html que tenga la clase completed, es decir el to do
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

filters.addEventListener('click', (event) => {
    //filtro contiene el texto al tag html que estamos haciendo click
    const filtro = event.target.text;

    //en caso de que no se seleccione nada, da undefined y devolvemos return
    if (!filtro) { return };

    anchorFiltros.forEach(elemento => {
        elemento.classList.remove('selected');
    });
    event.target.classList.add('selected');

    //recorremos los elementos que tenemos en el divTodoList
    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }


});