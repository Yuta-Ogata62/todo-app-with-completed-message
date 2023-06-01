const todoTitleInput = document.querySelector("#todoTitle");
const todoButtonElement = document.querySelector("#addTodoButton");
const todoListElement = document.querySelector("#todoItems");

let todoItems = [];

function clickFunction() {

    const todoItem = {
        title: todoTitleInput.value,
        id: crypto.randomUUID(),
        isCompleted: false,
    }

    todoTitleInput.value = ""

    todoItems.push(todoItem);

    reset();

    renderFunction();

};
todoButtonElement.addEventListener("click", clickFunction);


function getListItemIndexById(listItems, id) {

    let targetItemIndex = -1;
    for (let index = 0; index < listItems.length; index++) {
        const item = listItems[index];
        if (item.id === id) {
            targetItemIndex = index;
        }

    }
    return targetItemIndex;
}

function renderFunction() {
    for (i = 0; i < todoItems.length; i++) {
        let liItem = document.createElement('li');
        const todoItem = todoItems[i];
        let itemTitle = document.createElement('p');
        let todoTitle = todoItem.title;


        if (todoItem.isCompleted) {
            if(!todoItem.title.includes(" (completed)")) {
                const completedIndex = getListItemIndexById(todoItems, todoItem.id);
                todoItem.title += " (completed)";
                todoItems[completedIndex] = todoItem;
            }

        }

        itemTitle.innerHTML = todoTitle;
        liItem.appendChild(itemTitle);

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = "delete";
        deleteButton.addEventListener("click", () => {
            const targetIndex = getListItemIndexById(todoItems, todoItem.id)
            todoItems.splice(targetIndex, 1);
            reset();
            renderFunction();
        })
        liItem.appendChild(deleteButton);

        // make comp btn
        let completeButton = document.createElement('button');
        completeButton.innerHTML = "complete";

        completeButton.addEventListener("click", () => {
            const targetIndex = getListItemIndexById(todoItems, todoItem.id)

            todoItems[targetIndex].isCompleted = true;
            reset();
            renderFunction();
        })

        // <li><p>title</p><button>delete</button><button>complete</button></li>
        liItem.appendChild(completeButton);

        todoListElement.appendChild(liItem);
    }
}

function reset() {
    todoListElement.innerHTML = "";
}