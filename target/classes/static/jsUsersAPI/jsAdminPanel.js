const urlAdmin = 'http://localhost:8080/admin/api/'

const containerRoles = document.getElementById('roles')
let resultRoles = ''
let rolesArray = []

const new_user = document.forms["new_user_form"];
const new_user_roles = document.querySelector('#roles').selectedOptions

const modalEditUser = new bootstrap.Modal(document.getElementById('editModal'))
const edit_user = document.getElementById('edit_user_form');
const id_ed = document.getElementById('Id_ed');
const name_ed = document.getElementById('Name_ed');
const lastName_ed = document.getElementById('LastName_ed');
const age_ed = document.getElementById('Age_ed');
const username_ed = document.getElementById('Username_ed');
const password_ed = document.getElementById('Password_ed');
const containerEditRoles = document.getElementById('roles_ed')
const edit_user_roles = document.querySelector('#roles_ed').selectedOptions

modalDeleteUser = new bootstrap.Modal(document.getElementById('deleteModal'))
const delete_user = document.getElementById('delete_user_form');
const id_del = document.getElementById('Id_del');
const name_del = document.getElementById('Name_del');
const lastName_del = document.getElementById('LastName_del');
const age_del = document.getElementById('Age_del');
const username_del = document.getElementById('Username_del');
const containerDeleteRoles = document.getElementById('roles_del')

const containerInfo = document.getElementById('info');
let resultInfo = ''

const containerMainInfo = document.getElementById('mainInfo');
let resultMainInfo = ''

getUser();
getAllUsers()

// Таблица пользователей
async function getAllUsers() {
    let req = await fetch(urlAdmin + 'users')
    try {
        let users = await req.json();
        getAllThisUsers(users)
    } catch (error) {
        console.log(error)
    }
}

function getAllThisUsers(users) {
    const containerUsers = document.querySelector('tbody')
    let resultUsers = ''
    users.forEach(user => {
        resultUsers += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.username}</td>
            <td>${showRolesName(user.roles)}</td>                        
            <td>
              <button class="btn btn-info text-white"
              data-toggle="modal"
              data-bs-target="#editModal"
              onclick="editUser(${user.id})"
              type="button">
              Edit
              </button>
            </td>
            <td>
              <button class="btn btn-danger text-white"
              data-toggle="modal"
              data-bs-target="#deleteModal"
              onclick="deleteUser(${user.id})"
              type="button">
              Delete
              </button>
              </td>
            </tr>`
    })
    containerUsers.innerHTML = resultUsers;
}

// Информация пользователя
async function getUser() {
    let req = await fetch(urlAdmin + 'info')
    try {
        let user = await req.json();
        getThisUser(user);
    } catch (error) {
        console.log(error)
    }
}

function getThisUser(user) {
    resultMainInfo += `
            <b> ${user.username} </b> ${' with roles: ' + showRolesName(user.roles)}
       `
    containerMainInfo.innerHTML = resultMainInfo;
    resultInfo += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.username}</td>
            <td>${showRolesName(user.roles)}</td>
        </tr>`
    containerInfo.innerHTML = resultInfo;
}

// Создание пользователя
async function createUser() {
    new_user.addEventListener('submit', createThisUser)

    async function createThisUser(e) {
        e.preventDefault();
        let rolesValue = [];
        for (let i = 0; i < new_user_roles.length; i++) {
            if (new_user_roles[i].text === 'ADMIN') {
                rolesValue.push(rolesArray[0]);
            }
            if (new_user_roles[i].text === 'USER') {
                rolesValue.push(rolesArray[1]);
            }
        }
        let method = {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                name: new_user.name.value,
                lastName: new_user.lastName.value,
                age: new_user.age.value,
                username: new_user.username.value,
                password: new_user.password.value,
                roles: rolesValue
            })
        }
        console.log(method)
        await fetch(urlAdmin, method).then(() => {
            new_user.reset();
            getAllUsers()
            $("#home-tab").click();
        }).catch(error => console.log(error));
    }
}

// Редактирование пользователя
async function editUser(id) {
    let editUser = await fetch(urlAdmin + id);
    await editUser.json().then(async user => {
        id_ed.value = `${user.id}`;
        name_ed.value = `${user.name}`;
        lastName_ed.value = `${user.lastName}`;
        age_ed.value = `${user.age}`;
        username_ed.value = `${user.username}`;
        password_ed.value = `${user.password}`;
    }).catch(error => console.log(error))
    modalEditUser.show()
    edit_user.addEventListener('submit', editThisUser);
}

async function editThisUser(e) {
    e.preventDefault();
    let rolesValue = [];
    for (let i = 0; i < edit_user_roles.length; i++) {
        if (edit_user_roles[i].text === 'ADMIN') {
            rolesValue.push(rolesArray[0]);
        }
        if (edit_user_roles[i].text === 'USER') {
            rolesValue.push(rolesArray[1]);
        }
    }
    let method = {
        method: 'PATCH', headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({
            name: edit_user.name.value,
            lastName: edit_user.lastName.value,
            age: edit_user.age.value,
            username: edit_user.username.value,
            password: edit_user.password.value,
            roles: rolesValue
        })
    }
    console.log(method)
    await fetch(urlAdmin + id_ed.value, method).then(() => {
        modalEditUser.hide()
        getAllUsers()
        $("#home-tab").click();
    }).catch(error => console.log(error))
}

// Удаление пользователя
async function deleteUser(id) {
    let deleteUser = await fetch(urlAdmin + id);
    await deleteUser.json().then(async user => {
        id_del.value = `${user.id}`;
        name_del.value = `${user.name}`;
        lastName_del.value = `${user.lastName}`;
        age_del.value = `${user.age}`;
        username_del.value = `${user.username}`;
    }).catch(error => console.log(error))
    modalDeleteUser.show()
    delete_user.addEventListener('submit', deleteThisUser);
}

async function deleteThisUser(e) {
    e.preventDefault();
    let method = {
        method: 'DELETE', headers: {
            "Content-Type": "application/json"
        }
    }
    console.log(method)
    await fetch(urlAdmin + id_del.value, method).then(() => {
        modalDeleteUser.hide()
        getAllUsers()
        $("#home-tab").click();
    }).catch(error => console.log(error))
}




