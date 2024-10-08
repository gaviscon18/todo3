const addBtn = document.getElementById("addButton");
        const todoInput = document.getElementById("todoBox");
        let todoArray = [];
        const listArr = document.getElementById("listArray");
        const delBtn = document.getElementById("deleteAllBtn");

        addBtn.addEventListener("click", addTodo);
        delBtn.addEventListener("click", delTodos);
        addEventListener("DOMContentLoaded", storageToUI);

        function addTodo(e) {
            if (todoInput.value === "") {
                alert("Lütfen boş değer girmeyiniz!");
            } else {
                const newTodo = {
                    todo: todoInput.value,
                    done: false
                };

                const storedArray = getTodosFromStorage();
                todoArray = storedArray || []; // Eğer localStorage boşsa boş dizi kullan
                todoArray.push(newTodo);
                addTodoToUI(todoArray);
                addTodoToStorage(todoArray);
            }

            e.preventDefault();
        }

        function addTodoToUI(todoArray) {
            listArr.innerHTML = "";

            for (let i = 0; i < todoArray.length; i++) {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item d-flex justify-content-between border rounded col-md-8";
                listItem.appendChild(document.createTextNode(todoArray[i].todo));
                listItem.id = "toDoUIList";
                listItem.setAttribute('data-index', i);

                const delIcon = document.createElement("a");
                delIcon.href = "#";
                delIcon.className = "delIcon";

                const trashIcon = document.createElement("i");
                trashIcon.className = "bi bi-trash";
                trashIcon.id = "trashDel";
                trashIcon.onclick = todoDelete;

                delIcon.appendChild(trashIcon);
                listItem.appendChild(delIcon);
                listArr.appendChild(listItem);
            }

            todoInput.value = "";
        }

        function todoDelete(e) {
            const liElement = e.target.parentElement.parentElement;
            const index = liElement.getAttribute('data-index');

            liElement.remove();
            todoArray.splice(index, 1);

            const storedArray = JSON.parse(localStorage.getItem('strArray'));
            storedArray.splice(index, 1);
            localStorage.setItem('strArray', JSON.stringify(storedArray));
        }

        function delTodos() {
            listArr.innerHTML = "";
            todoArray.length = 0;
            localStorage.setItem('strArray', JSON.stringify([]));
        }

        function addTodoToStorage() {
            localStorage.setItem('strArray', JSON.stringify(todoArray));
        }

        function storageToUI() {
            const storedArray = getTodosFromStorage();
            todoArray = storedArray || []; // Eğer localStorage boşsa boş dizi kullan
            addTodoToUI(todoArray);
        }

        function getTodosFromStorage() {
            let storedArray;

            if (localStorage.getItem("strArray") === null) {
                storedArray = [];
            } else {
                storedArray = JSON.parse(localStorage.getItem('strArray'));
            }
            return storedArray;
        }
