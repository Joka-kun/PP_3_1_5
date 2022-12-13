const urlRole = 'http://localhost:8080/roles/api/'

getRoles()

// Роли
async function getRoles() {
    let req = await fetch(urlRole)
    try {
        let roles = await req.json();
        showRoles(roles);
    } catch (error) {
        console.log(error)
    }
}

function showRolesName(roles) {
    return roles.map(role => role.role.replace('ROLE_', '')).reverse().join(" ")
}

function showRoleName(role) {
    return role.role.replace('ROLE_', '')
}

function showRoles(roles) {
    roles.forEach(role => {
        rolesArray.push(role)
        resultRoles += `
        <option value='${role}'> ${showRoleName(role)} </option>
    `
    })
    containerRoles.innerHTML = resultRoles
    containerEditRoles.innerHTML = resultRoles
    containerDeleteRoles.innerHTML = resultRoles
}