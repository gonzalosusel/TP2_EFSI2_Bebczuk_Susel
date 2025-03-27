let todo = [];

const crearCheckbox = (item) => `<input type="checkbox" id="${todo.lastIndexOf(item)}" class="form-check-input" onclick="touchCheckbox(this)" ${item.chequeado ? "checked" : ""}>`;
const crearDiv = (item) => {
    if(item.chequeado)
        return `<div id="listaItem${todo.lastIndexOf(item)}" class="listaItem tachado">${crearCheckbox(item)}<p>${item.tarea} (Creado: ${item.timestamp.toDateString()})</p></div>`;
    else
        return `<div id="listaItem${todo.lastIndexOf(item)}" class="listaItem">${crearCheckbox(item)}<p>${item.tarea} (Creado: ${item.timestamp.toDateString()})</p></div>`
}
function AñadirItem(){
    const input = document.querySelector("#item");
    const list = document.querySelector("#list");
    const item = input.value;
    input.value = "";

    if(!item || !item.match(/[^\W]/)) return; // no añadir items vacíos, amamos regex
    todo.push({
        tarea: item,
        timestamp: new Date(),
        timestampChequeado: null,
        chequeado: false,
    });

    list.innerHTML = "";
    for(let i = 0; i < todo.length; i++){
        list.innerHTML += crearDiv(todo[i]);
    }
}

function touchCheckbox(el){
    if(el.checked){
        document.querySelector(`#listaItem${el.id}`).classList.add("tachado");
        todo[el.id].chequeado = true;
        todo[el.id].timestampChequeado = new Date();
    } else {
        document.querySelector(`#listaItem${el.id}`).classList.remove("tachado");
        todo[el.id].chequeado = false;
        todo[el.id].timestampChequeado = null;
    }
}

function mostrarTareaRapida(){
    const par = document.querySelector("#tarearapida");
    if(todo.filter(item => item.chequeado).length == 0){
        par.textContent = "Aún no hay ninguna tarea resuelta";
        return;
    }

    let minTarea = "";
    let minTiempo = Number.MAX_VALUE;

    for(let i = 0; i < todo.length; i++){
        if(todo[i].timestampChequeado - todo[i].timestamp < minTiempo){
            minTiempo = todo[i].timestampChequeado - todo[i].timestamp;
            minTarea = todo[i].tarea;
        }
    }

    par.textContent = `La tarea que más rápido se ha concretado fue: ${minTarea}`;
}