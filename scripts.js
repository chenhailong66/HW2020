let tasks = [];
let importitems=0;
function renderEditor() {
    //如果键入内容为空则不执行插入
    let inputEl = document.getElementById("task-input");
    let addTask = () => {
        if (inputEl.value.length === 0) {
            return;
        }
        let newtask = {
            title: inputEl.value,
            done: false,
            import: false
        };
        inputEl.value = "";
        tasks.push(newtask);
        renderTaskitems();
    }
    //按ENTER键执行插入操作
    inputEl.onkeypress = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    }
    //点击加号执行插入操作
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

        
        item.append(doneEl);

        let labelEl = document.createElement("label");
        labelEl.innerText = task.title;
        item.append(labelEl);

        let ctr_buttonsEl = renderTaskCtrlButton(task, item, i);

        item.append(ctr_buttonsEl);
        itemsEl.append(item);

        //事件完成响应
        doneEl.checked = task.done;
        let impEl = item.querySelector(".todo-items  .ctr-buttons  input");
        if (task.done) {
            item.classList.add("done");
            impEl.disabled = true;
        }
        else {
            item.classList.remove("done");
            impEl.disabled = false;
        }
        doneEl.onchange = (e) => {
            task.done = e.target.checked;

            if (task.done) {
                item.classList.add("done");
                impEl.disabled = true;
            }
            else {
                item.classList.remove("done");
                impEl.disabled = false;
            }
        }
    }

}
//按钮控制函数
function renderTaskCtrlButton(task, item, task_index) {
    let ctr_buttonsEl = document.createElement("div");
    ctr_buttonsEl.className = "ctr-buttons";
    //是否重要按钮
    let impEl = document.createElement("input");
    impEl.type = "checkbox";
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
            let t = task;
            for (let j = task_index; j > 0; j--) {
                tasks[j] = tasks[j - 1];
            }
            tasks[0] = t;
            importitems++;
        }
        else {
            item.classList.remove("import");
            let t = task;
            for (let j = task_index; j <tasks.length-1; j++) {
                tasks[j] = tasks[j+1];
            }
            tasks[tasks.length-1] = t;
            importitems--;
        }
        renderTaskitems();

    }
    ctr_buttonsEl.append(impEl);
    //向上按钮
    let upEl = document.createElement("button");
    if (task_index === 0||task_index===importitems) {
        upEl.disabled = true;
    }
    //执行向上移动
    upEl.onclick = () => {
        let t = tasks[task_index];
        tasks[task_index] = tasks[task_index - 1];
        tasks[task_index - 1] = t;
        renderTaskitems();
    }
    upEl.innerText = "🠕";
    ctr_buttonsEl.append(upEl);
    //向下按钮
    let downEl = document.createElement("button");
    downEl.innerText = "🠗";
    ctr_buttonsEl.append(downEl);
    if (task_index === tasks.length - 1||task_index===importitems-1) {
        downEl.disabled = true;
    }

    //执行向下移动
    downEl.onclick = () => {
        let t = tasks[task_index];
        tasks[task_index] = tasks[task_index + 1];
        tasks[task_index + 1] = t;
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
