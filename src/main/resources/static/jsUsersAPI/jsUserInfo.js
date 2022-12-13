const urlUser = 'http://localhost:8080/user/api/'

const containerInfo = document.getElementById('info');
let resultInfo = ''

const containerMainInfo = document.getElementById('mainInfo');
let resultMainInfo = ''

getUser();

// Информация пользователя
async function getUser() {
    let req = await fetch(urlUser + 'info')
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
