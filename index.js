let btnAdd = document.querySelector('button');
let taskName = document.getElementById('content');

// localStorage.removeItem('test')
// alert(localStorage.getItem('test'))

let tasks = getTaskFromLocalStorage()
listTasks(tasks)

btnAdd.addEventListener('click', function() {
    if (!taskName.value) {
        alert('vui lòng nhập tên công việc')
        return false
    }

    // lấy ra chính cái attribute vừa click
    let taskId = this.getAttribute('id')

    let tasks = getTaskFromLocalStorage()

    let task = { name: taskName.value }

    /*mỗi lần thêm mới 1 task thì chúng ta push nó vào(thêm mới)*/
    if (taskId == 0 || taskId) {
        tasks[taskId] = task

        // sau khi cập nhật xong setAttribute ''
        this.removeAttribute('id')
    } else {
        tasks.push(task)
    }

    /*reset lại cái này*/
    /*mỗi lần nhập xong nó sẽ clean text*/
    taskName.value = '';
    /*chúng ta sẽ listTasks khi chúng ta thêm mới ở đây */
    localStorage.setItem('tasks', JSON.stringify(tasks));
    listTasks(tasks);
})

/*
tasks = [] : nhập vào 1 cái mảng taks 
*/

function editTask(id) {
    let tasks = getTaskFromLocalStorage()
    if (tasks.length > 0) {
        taskName.value = tasks[id].name
        btnAdd.setAttribute('id', id)
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete')) {
        let tasks = getTaskFromLocalStorage()
        tasks.splice(id, 1)

        // ghi lại task local
        localStorage.setItem('tasks', JSON.stringify(tasks))
        listTasks(getTaskFromLocalStorage())
    }
}

function listTasks(tasks = []) {

    /*ban đầu mảng = array rỗng */
    let content = '<ul>'

    /*duyệt cái tasks => mỗi lần duyệt chúng ta sẽ lấy ra 1 cái task
     */

    tasks.forEach((task, index) => {
        content += `<li>
        <div class="li-name">${task.name}</div>
        <a href="#" onclick="editTask(${index})">sửa</a>
        <a href="#" onclick="deleteTask(${index})">xóa</a>
     </li>`
    })

    content += '</ul>'

    /*show ra cái task mà chúng ta cần */
    document.getElementById('result').innerHTML = content
}

function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}