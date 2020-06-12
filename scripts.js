let tasks = [];
function renderEditor() {
    let inputEl = document.getElementById("task-input");
    let addTask = () => {
        let newtask = {
            title: inputEl.value,
            done: false
        };
        inputEl.value = "";
        tasks.push(newtask);
        renderTaskitems();
    }
    inputEl.onkeypress = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    }
    let addEl = document.querySelector(".todo-editor > button");
    addEl.onclick = (e) => {
        addTask();
    }
}
function renderTaskitems() {
    let itemsEl = document.querySelector(".todo-panel .todo-items");
    itemsEl.querySelectorAll("div").forEach((node) => node.remove());
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let item = document.createElement("div");
        item.innerHTML = "<input type='checkbox'><label>" + task.title + "</label>";
        let cancel = document.createElement("button");
        cancel.innerText="X";
        item.append(cancel);
        //进行删除操作
        cancel.onclick=()=>{
            let flag = confirm(`您确定删除'${task.title}'这个待办项吗`);
            if(flag){
               tasks.splice(i,1);
           renderTaskitems();  
            }
        };
        itemsEl.append(item);
        
    }

}
renderEditor();