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

// Todotask
function fetchTodoData() {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function validateCompletedTasks() {
  let completedCount = 0;
  return new Promise((resolve, reject) => {
    fetchTodoData()
      .then(data => {
        const tableBody = document.querySelector('#todoTable tbody');

        data.forEach(todo => {
          const row = document.createElement('tr');
          const idCell = document.createElement('td');
          const titleCell = document.createElement('td');
          const completedCell = document.createElement('td');
          const checkbox = document.createElement('input');
          const checkboxLabel = document.createElement('label');

          checkbox.type = 'checkbox';
          checkbox.checked = todo.completed;
          checkbox.disabled = todo.completed;
          checkbox.classList.add('checkbox-custom');
          checkboxLabel.classList.add('checkbox-label');
          checkboxLabel.appendChild(checkbox);

          checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked;
            if (checkbox.checked) {
              completedCount++;
            } else {
              completedCount--;
            }
            if (completedCount === 5) {
              resolve();
            }
          });

          idCell.textContent = todo.id;
          titleCell.textContent = todo.title;
          completedCell.appendChild(checkboxLabel);

          row.appendChild(idCell);
          row.appendChild(titleCell);
          row.appendChild(completedCell);

          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}

validateCompletedTasks()
  .then(() => {
    alert('Congrats!! 5 Tasks have been Successfully Completed');
  })
  .catch(error =>{
       console.error('Error:', error);
    });