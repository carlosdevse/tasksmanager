const form = document.getElementById("task-form");
const tbody = document.getElementById("task-table");
const inputTask = document.getElementById("task-input");
const btnClear = document.getElementById("btn-clear")

// cargar tareas guardadas en localStorage
loadTasks();


// boton para limpiar localStorage
btnClear.addEventListener("click", () => {
    const promtClear = confirm("¿Estás segur@ de eliminar todos los registros de la tabla?");
    if (promtClear) {
        localStorage.clear();
        location.reload();
    } 
})

// funcion para obtener los numeros para la tabla #
function numTaks() {
    const numTags = tbody.childElementCount;
    return numTags + 1;
}

// evento submit en formulario
form.addEventListener("submit", (event) => {
    // desactivar recarga al dar submit
    event.preventDefault();

    // tomar valor del input
    const task = inputTask.value.trim();

    if (!task) return;
    // crear la tarea
    tbody.appendChild(createTask(task));
    // mandar tarea a localstorage
    localStoreTasks(task);

    inputTask.value = "";

});

// funcion para crear tareas
function createTask(task) {
    const trTag = document.createElement("tr");
    trTag.className = "hover:bg-indigo-900/20"
    const tdTask = document.createElement("td");
    tdTask.textContent = task;
    tdTask.className = "px-4 py-3 whitespace-nowrap border border-gray-700"

    const tdButtons = document.createElement("td");
    tdButtons.className = "w-20 border border-gray-700 text-lg px-4 py-3 gap-2 ltr:text-left"
    tdButtons.append(
        createButton("btn-edit", "fa fa-solid fa-pencil cursor-pointer md:text-gray-500 hover:text-gray-100 "),
        createButton("btn-delete", "fa fa-solid  fa-trash cursor-pointer text-red-500 md:text-red-900 px-3 hover:text-red-500")
    );

    const tdCont = document.createElement("td");
    tdCont.className = "px-4 py-3 w-10 whitespace-nowrap border border-gray-700";
    tdCont.innerHTML = `<span class="opacity-69">${numTaks()}</span>`;

    trTag.append(tdCont, tdTask, tdButtons);
    return trTag;

}

// funcion para crear los botones
function createButton(classBtn, iconClass) {
    const btn = document.createElement("i");
    btn.className = `${iconClass} ${classBtn}`;
    return btn;
}

// escuchar click en los botones (eliminar y editar)
tbody.addEventListener("click", (event) => {
    if (event.target.closest(".btn-delete")) {
        // funcion para eliminar
        deleteTask(event.target.closest("tr"));
    } else if (event.target.closest(".btn-edit")) {
        // funcion para editar
        editTask(event.target.closest("tr").children[1]);

    }
})

// funcion para editar tarea
function editTask(task) {
    // mostrar promt
    const newTask = prompt("Edita la tarea: " + task.textContent)
    // si no está vacío camnbiar el nuevo texto ingresado en el promt 
    if (newTask !== null && newTask.trim() !== "") {
        task.textContent = newTask;
        // actualizar el localStorage
        updateLocalStorage();
    }
}

// funcion para eliminar tarea
function deleteTask(task) {
    // pregunta al usuario
    const windowConf = confirm("¿Estás seguro de eliminar este registro?");
    if (windowConf) {
        task.remove();
        updateLocalStorage();
    }
}

// funcion para guardar las tareas el LocalStorage
function localStoreTasks(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// cargar las tareas en la tabla
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    // foreach para inyectar tareas
    tasks.forEach((task) => {
        tbody.appendChild(createTask(task));
    })
}

// actualizar las tareas de localStorage cada que se actualice una tarea
function updateLocalStorage() {
    const tasks = Array.from(tbody.querySelectorAll("tr")).map(tr => tr.children[1].textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// al presionar f2 o click en el boton f2 mandar al input
const pressFdos = document.getElementById('tecla-f2');
const enterFdos = document.getElementById('enter-f2');

pressFdos.addEventListener("click", () => {
    inputTask.focus()
})
enterFdos.addEventListener("click", () => {
    inputTask.focus()
})
document.addEventListener("keydown" , (event) => {
    if (event.key === "F2") {
    inputTask.focus()
    }
})