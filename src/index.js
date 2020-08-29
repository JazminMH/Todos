import './styles.css';
import { Todo, TodoList } from './classes';
import { creatTodoHtml } from './js/componentes';

export const todoList = new TodoList();

//recorremos el arreglo  de objetos y por cada uno vamos 
//a crear el elemtno html a mostrar
//Podemos simplificar el codigo, del a siguiente fomra, cuando
//en el foreach se devuelce un solo elemento
todoList.todos.forEach(creatTodoHtml);

//console.log('To do list: ', todoList.todos);
//todoList.todos[0].imprimirClase();



//const tarea = new Todo('Aprender Javascript');
//todoList.nuevoTodo(tarea);
//console.log(todoList);
//creatTodoHtml(tarea);


//Agregar un item (llave-valor)
//localStorage.setItem('mi-key', 'DEFG');
//sessionStorage.setItem('mi-key', 'ABC');

//utilizamos se tTimeout para eliminar un item del localStorage
//y usando rempveItem ('Nombre del item')
/*setTimeout(() => {
    localStorage.removeItem('mi-key');
}, 1500);*/