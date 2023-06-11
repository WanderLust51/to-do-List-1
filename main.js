let todoList = [];
let completedList = [];

$(document).ready(function(){

    $('form > button').click(addlist);
    checkForLocalStorage();

})


function addlist(){
    todo = $('#toDoInput').val();
    $('#toDoInput').val('');
    let regx = /[a-zA-Z0-9]/gi;

    if (regx.test(todo)){
        todoList.push(todo);
        let id = todoList.length - 1;
    
        addRow(todo, id);
    }

}

function addRow(todo, id){

    let newRow = document.createElement('div');
    $(newRow).addClass('todo').addClass('my-bg-green3');
    $(newRow).attr('id', id)
    
    let div1 = document.createElement('div');
    let h4 = document.createElement('h4');
    $(h4).text(todo);
    $(div1).append(h4);
    
    let div2 = document.createElement('div');
    let checkDiv = document.createElement('div');
    let cancelDiv = document.createElement('div');
    let check = document.createElement('ion-icon');
    let cancel = document.createElement('ion-icon');
    $(check).attr('name', 'checkmark-outline');
    $(cancel).attr('name', 'close-outline');
    $(checkDiv).append(check).addClass('my-bg-hover');
    $(cancelDiv).append(cancel).addClass('my-bg-hover');

    $(checkDiv).click(completeTodo).click(deleteRow);
    $(cancelDiv).click(deleteRow);

    $(div2).append(checkDiv).append(cancelDiv);

    $(newRow).append(div1);
    $(newRow).append(div2);
    $('#list').append(newRow);

    updateStorage();
}

function deleteRow(){
    let row = $(this).parent().parent();
    let id = Number($(row).attr('id'));
    console.log(`Eliminando Nº ${id+1}.`)

    //ELIMINANDO DEL ARREGLO
    todoList.splice(id,1);

    //ELIMINANDO EL ELEMENTO
    $(row).remove();

    sortRows();
    completedShowHide();
    updateStorage();
}

function completeTodo(){
    let row = $(this).parent().parent();
    let todo = $(row).children('div:first-child').children().text();

    let newRow = document.createElement('div');
    let div = document.createElement('div');
    let p = document.createElement('p');
    $(p).text(todo).addClass('text-decoration-line-throug');
    $(div).append(p).addClass('my-bg-green3');
    $(newRow).append(div);

    $('#completed').append(div);
}

function sortRows(){
    let list = $('#list').children();

    for (i = 0; i < list.length; i++){
        let div = list[i];

        $(div).attr('id', i);
    }
}

function updateStorage(){
    let list = JSON.stringify(todoList);
    localStorage.setItem('TodoData', list)
    // console.log('Local Storage Actualizado...');
}

function completedShowHide(){
    if ($('#completed').children().length > 0){
        $('#completedParent').addClass('d-flex').removeClass('d-none');
    }else{
        $('#completedParent').removeClass('d-flex').addClass('d-none');
    }
}

function checkForLocalStorage(){
    let data = JSON.parse(localStorage.getItem('TodoData'));

    if (data != null){
        loadTodo(data);
        todoList = data;
    }else{
        console.log('Creando almacenamiento local...');
        todoList = [];
    }
    updateStorage();
}

function loadTodo(data){
    for (i in data){
        addRow(data[i], i);
    }
}