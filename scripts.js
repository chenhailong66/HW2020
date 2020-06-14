let tasks = [];
function renderEditor() {
    let inputEl = document.getElementById("task-input");
    let addTask = () => {
        if (inputEl.value.length === 0) {
            return;
        }
        let newtask = {
            title: inputEl.value,
            done: false,
            import:false
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
        item.className = "task";

        let doneEl = document.createElement("input");
        doneEl.type = "checkbox";
        
        //完成响应
        doneEl.checked = task.done;
        if (task.done) {
            item.classList.add("done")
        }
        else {
            item.classList.remove("done");
        }
        doneEl.onchange = (e) => {
            task.done = e.target.checked;
            if (task.done) {
                item.classList.add("done")
            }
            else {
                item.classList.remove("done");
            }
        }


        item.append(doneEl);

        let labelEl = document.createElement("label");
        labelEl.innerText = task.title;
        item.append(labelEl);

        let ctr_buttonsEl = renderTaskCtrlButton(task, i);

        item.append(ctr_buttonsEl);
        itemsEl.append(item);
        
        //重要性响应
        let impEl = document.querySelectorAll(".ctr-buttons input")[i];
        impEl.checked = task.import;
        if (task.import) {
            item.classList.add("import");
        }
        else {
            item.classList.remove("import");
        }
        impEl.onchange = (e) => {
            task.import = e.target.checked;
            if (task.import) {
                item.classList.add("import");
            }
            else {
                item.classList.remove("import");
            }
        }

    }

}
//按钮控制函数
function renderTaskCtrlButton(task, task_index) {
    let ctr_buttonsEl = document.createElement("div");
    ctr_buttonsEl.className = "ctr-buttons";
    //是否重要按钮
    let impEl = document.createElement("input");
    impEl.type = "checkbox";
    ctr_buttonsEl.append(impEl);
    //向上按钮
    let upEl = document.createElement("button");
    if(task_index===0)
    {
        upEl.disabled=true;
    }
    //执行向上移动
    upEl.onclick = ()=>{
        let t=tasks[task_index];
        tasks[task_index]=tasks[task_index-1];
        tasks[task_index-1]=t;
        renderTaskitems();
    }
    upEl.innerText = "🠕";
    ctr_buttonsEl.append(upEl);
    //向下按钮
    let downEl = document.createElement("button");
    downEl.innerText = "🠗";
    ctr_buttonsEl.append(downEl);
    if(task_index===tasks.length-1)
    {
        downEl.disabled=true;
    }

    //执行向下移动
    downEl.onclick = ()=>{
        let t=tasks[task_index];
        tasks[task_index]=tasks[task_index+1];
        tasks[task_index+1]=t;
        renderTaskitems();
    }

    //删除按钮
    let cancelEl = document.createElement("button");
    cancelEl.innerText = "X";

    //进行删除操作
    cancelEl.onclick = () => {
        let flag = confirm(`您确定删除'${task.title}'这个待办项吗`);
        if (flag) {
            tasks.splice(task_index, 1);
            renderTaskitems();
        }
    };
    ctr_buttonsEl.append(cancelEl);
    return ctr_buttonsEl;
}
renderEditor();