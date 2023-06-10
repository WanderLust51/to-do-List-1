let todo = '';
let todoList = [];
let listSize;

$(document).ready(function(){

    $('form > button').click(addlist);

})


function addlist(){
    todo = $('#toDoInput').val();

    listSize = todoList.length;
    todoList.push(todo);

    addRow(todo);
}

function addRow(todo){

    newRow = ''


    $('#list').append();
}

function updateStorage(){
    let list = JSON.stringify(todoList);
    localStorage.setItem('TodoData', list)
    console.log('Local Storage Actualizado...');
}