import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        //this.todos = [];
        //taremos los datos del metodo CargarLocalStorage
        this.cargarLocalStorage();
    }
    nuevoTodo(todo) {
        this.todos.push(todo);

        //cuando creamos un nuevo todo, actualizamos localStorage
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        //utilizaremos filter ara devolver un arreglo sin el elemento
        //que coincida con el id enviado
        this.todos = this.todos.filter(todo => todo.id != id);

        //cuando eliminamos un todo, debemos actualziar el localStorage
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                //cambiamos el valor de true a false o viceversa
                todo.completado = !todo.completado;

                //cuando hacemos un cambio, actualizamos el localstorage
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        //usamos filter para devolver un array
        //con los to do que no han sido completados
        this.todos = this.todos.filter(todo => !todo.completado);

        //llamamos al localStorage para que cuando hacemos una
        //eliminacion, se actualice el localStorage
        this.guardarLocalStorage();
    }

    //metodo que va a servir para guardar los to do en el localStorage
    guardarLocalStorage() {
        //Convertimos el arreglo de to do a un JSON
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    //metodo para traer los datos del localStorage
    cargarLocalStorage() {
        //verificamos que exista un Item llamado todo ,que es como
        //guardamos los to do y si existe, devolvemos el objeto original
        //con JSON.parse, en otro caso devolvemos un array vacio
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];

        this.todos = this.todos.map(Todo.fromJson);
    }
}