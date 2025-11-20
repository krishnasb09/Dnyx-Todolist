const addbtn=document.getElementById("add-btn");
const todoInput=document.getElementById("input");
const todolist=document.getElementById("todolist");
const pagination=document.getElementById("pagination");
let todos=[];
let i=0
if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    i = todos.length > 0 ? todos[todos.length - 1].id : 0;
    generateli();
}

addbtn.addEventListener("click",()=>{
    let t=todoInput.value;
    if (t=== "") {
        alert("Please enter a task before adding!");
        return; 
    }

    i+=1;
    let text=todoInput.value;
    let obj={};
    obj.id = i;
    obj.text =text;
    obj.completed=false
    todos.push(obj);
    generateli()
    todoInput.value=""
    
})

function generateli(){
    let ul = document.getElementById("todolist");
    ul.innerHTML = "";
    for(let j=0;j<todos.length;j++){
        let li_ele=document.createElement("li")
        li_ele.classList.add("todo-item");
        li_ele.id=todos[j]["id"]
        
        let checkbox = document.createElement("input"); 
        checkbox.type = "checkbox";
        checkbox.checked=todos[j].completed;
        
        
        checkbox.addEventListener("change", () => {
           
            if (!checkbox.checked) {
              checkbox.checked = true;
              return;
            }
          
          
            todos[j].completed = true;
        
            localStorage.setItem("todos", JSON.stringify(todos));
            
            generateli();
          });
          
        
       
        let textSpan = document.createElement("span");
        textSpan.innerText = todos[j].text;
        textSpan.classList.add("li-text");

        localStorage.setItem("todos", JSON.stringify(todos)); 

        textSpan.classList.add("li-text");
        li_ele.appendChild(checkbox);
        li_ele.appendChild(textSpan);

        //delete button functionality
        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.classList.add("delbtn");
        delBtn.setAttribute("data-id", todos[j].id);
        
        delBtn.addEventListener("click", function () {
            let deleteId = Number(this.getAttribute("data-id"));
            todos = todos.filter(item => item.id !== deleteId);
            localStorage.setItem("todos", JSON.stringify(todos));
            generateli();
        });

        //edit button functionality
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("editbtn");
        editBtn.addEventListener("click", function () {
            let inputBox = document.createElement("input");
            inputBox.type = "text";
            inputBox.classList.add("input-box-edit");
            inputBox.value = textSpan.innerText;
        
            li_ele.replaceChild(inputBox, textSpan);
            editBtn.innerText = "Save";
        
            editBtn.onclick = function () {
                
                todos[j].text = inputBox.value.trim();
                textSpan.innerText =  inputBox.value;
                li_ele.replaceChild(textSpan, inputBox);
                editBtn.innerText = "Edit";
                localStorage.setItem("todos", JSON.stringify(todos));
                generateli(); 
            };
        });
        

        if (todos[j].completed === true) {
            li_ele.classList.add("completed");
        }
        
        li_ele.appendChild(checkbox);
        li_ele.appendChild(textSpan);
        li_ele.appendChild(delBtn);
        li_ele.appendChild(editBtn)
        ul.appendChild(li_ele);

        


    }
}
const filterButtons = document.querySelectorAll(".filter-btns");
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        filterTasks(filter);
    });
});

function filterTasks(filterType) {
    const items = todolist.querySelectorAll("li");

    items.forEach(li => {
        const isCompleted = li.classList.contains("completed");

        if (filterType === "all") {
            li.style.display = "flex";
        } else if (filterType === "pending") {
            li.style.display = isCompleted ? "none" : "flex";
        } else if (filterType === "completed") {
            li.style.display = isCompleted ? "flex" : "none";
        }
    });
}
