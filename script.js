// login validation
function login(callback){
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    var erru=document.getElementById('erroruser');
    var errp=document.getElementById('errorpass');
    if(username==''&&password==''){
      alert('Invalid login credentials');
    }
    if(username==''){
      erru.innerText='Cannot be empty'
      erru.style.color='red';
      erru.style.background='white';
    }
    else if(username!='admin'){
      erru.innerText='Invalid Username'
      erru.style.color='red';
      erru.style.background='white';
    }
    else if(username==='admin'){
      erru.innerText='Valid'
      erru.style.color='Green';
      erru.style.background='white';
    }
    if(password==''){
      errp.innerText='Cannot be empty'
      errp.style.color='red';
      errp.style.background='white';
    }
    else if(password!=12345){
      errp.innerText='Invalid Password'
      errp.style.color='red';
      errp.style.background='white';
    }
    else if(password==12345){
      errp.innerText='Valid'
      errp.style.color='green';
      errp.style.background='white';
    }
    if(username=='admin'&&password==12345){
      callback();
    }
}
function todopage(){
    window.location.href='homepage.html';
}


// Todo List

// function ajax(){
//   var xhttp=new XMLHttpRequest();
//   xhttp.onreadystatechange=function(){

//     if(this.readyState==4 && this.status==200){
//       var response =JSON.parse(this.responseText);
//       var output1="";
//       var output2="";
//       var output3="";
//       for(var i=0;i<response.length;i++){
//         output1 +=response[i].id+" "+response[i].title+"<br>";
//       }
//       document.getElementById('output').innerHTML=output1;
//     }
//   }
//   xhttp.open('GET',"https://jsonplaceholder.typicode.com/todos",true);
//   xhttp.send();
// }

function fetchTodoList() {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

function processTodoList(todoList) {
  let completedTaskCount = 0;

  // Update the UI to display todo list items with checkboxes
  const todoListElement = document.getElementById('output2');
  todoList.forEach(todo => {
    const listItem = document.createElement('li');
    // listItem.textContent = todo.id;

    const label = document.createElement('label');
    label.textContent = todo.title;
    listItem.appendChild(label);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    //checkbox.checked = false;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        completedTaskCount++;
      } else {
        completedTaskCount--;
      }

      if (completedTaskCount === 95) {
        showAlert(completedTaskCount);
      }
    });
    listItem.appendChild(checkbox);



    if (todo.completed) {
      listItem.style.textDecoration = 'line-through';
      completedTaskCount++;
    }

    todoListElement.appendChild(listItem);
  });

  // Check if there are already 95 completed tasks
  if (completedTaskCount === 95) {
    showAlert(completedTaskCount);
  }
}

function showAlert(completedTaskCount) {
  window.alert(`Congratulations ! 5 tasks completed.`);
}


// Fetch the todo list data from the API and process it
fetchTodoList()
  .then(data => processTodoList(data))
  .catch(error => console.error(error));