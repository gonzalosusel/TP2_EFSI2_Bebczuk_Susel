let todo = [];

const crearCheckbox = (item) => {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = todo.lastIndexOf(item);
    checkbox.classList.add("form-check-input");
    checkbox.addEventListener("click", touchCheckbox);
    return checkbox;
}

function AñadirItem(){
    const input = document.querySelector("#item");
    const list = document.querySelector("#list");
    const item = input.value;
    input.value = "";

    if(!item || !item.match(/[^\W]/)) return; // no añadir items vacíos
    todo.push(item);

    let nuevoNodo = document.createElement("p");
    let checkbox = crearCheckbox(item);

    nuevoNodo.innerHTML = item;

    let div = document.createElement("div");
    div.classList.add("listaItem");
    div.id = "listaItem" + todo.lastIndexOf(item);

    div.appendChild(checkbox);
    div.appendChild(nuevoNodo);
    list.appendChild(div); // se añade un nuevo nodo a la lista
}

function touchCheckbox(e){
    if(e.target.checked) document.querySelector(`#listaItem${e.target.id}`).classList.add("tachado");
    else document.querySelector(`#listaItem${e.target.id}`).classList.remove("tachado");
}