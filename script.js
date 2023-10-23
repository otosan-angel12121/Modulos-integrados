// Estructura de datos para módulos y usuarios
const data = {
    modules: [],
    selectedModuleIndex: -1,
    selectedUserIndex: -1,
};

// Función para mostrar los módulos en la lista
function displayModules() {
    const modulesList = document.getElementById("modules");
    modulesList.innerHTML = "";
    data.modules.forEach((module, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `Módulo ${index + 1}: ${module.name}`;
        modulesList.appendChild(listItem);
    });

    // Actualizar el selector de módulos en el formulario de usuario
    const moduleSelector = document.getElementById("module-selector");
    moduleSelector.innerHTML = '<option value="-1">Seleccione un Módulo</option>';
    data.modules.forEach((module, index) => {
        moduleSelector.innerHTML += `<option value="${index}">Módulo ${index + 1}: ${module.name}</option>`;
    });
}

// Función para agregar un módulo
function addModule() {
    const moduleName = prompt("Nombre del módulo:");
    if (moduleName) {
        data.modules.push({ name: moduleName, users: [] });
        displayModules();
    }
}

// Función para eliminar un módulo
function deleteModule() {
    if (data.selectedModuleIndex >= 0 && data.selectedModuleIndex < data.modules.length) {
        data.modules.splice(data.selectedModuleIndex, 1);
        data.selectedModuleIndex = -1;
        displayModules();
        clearUserForm();
        displayUserData();
    }
}

// Función para mostrar información de usuario
function displayUserData() {
    data.selectedModuleIndex = parseInt(document.getElementById("module-selector").value);
    const userForm = document.getElementById("user-form");
    const userSelector = document.getElementById("module-selector");

    if (data.selectedModuleIndex === -1) {
        userForm.style.display = "none";
        clearUserForm();
        return;
    }

    const users = data.modules[data.selectedModuleIndex].users;
    userForm.style.display = "block";
    displayUsersList(users);
}

// Función para mostrar la lista de usuarios en el formulario
function displayUsersList(users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";

    if (users && users.length > 0) {
        users.forEach((user, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>Usuario ${index + 1}:</strong><br>
                Nombre: ${user.name}<br>
                Correo Electrónico: ${user.email}<br>
                Producto: ${user.product}<br>
                Teléfono: ${user.phone}<br>
                Dirección: ${user.address}<br>
                <img src="${user.productImage}" alt="Imagen del Producto" width="100">`;
            listItem.onclick = () => selectUser(index);
            userList.appendChild(listItem);
        });
    } else {
        userList.innerHTML = "<p>No hay usuarios en este módulo.</p>";
    }
}

// Función para agregar o actualizar la información del usuario en un módulo
function addUserToModule() {
    if (data.selectedModuleIndex >= 0 && data.selectedModuleIndex < data.modules.length) {
        const selectedModule = data.modules[data.selectedModuleIndex];
        const userForm = document.getElementById("user-form");
        const user = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            product: document.getElementById("product").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            productImage: URL.createObjectURL(document.getElementById("product-image").files[0])
        };

        if (user.name && user.email && user.product && user.phone && user.address) {
            if (data.selectedUserIndex === -1) {
                selectedModule.users.push(user);
            } else {
                selectedModule.users[data.selectedUserIndex] = user;
            }
            displayUsersList(selectedModule.users);
            clearUserForm();
        }
    }
}

// Función para eliminar un usuario
function deleteUser() {
    if (data.selectedModuleIndex >= 0 && data.selectedModuleIndex < data.modules.length && data.selectedUserIndex >= 0) {
        const selectedModule = data.modules[data.selectedModuleIndex];
        selectedModule.users.splice(data.selectedUserIndex, 1);
        displayUsersList(selectedModule.users);
        clearUserForm();
    }
}

// Función para seleccionar un usuario y cargar sus datos en el formulario
function selectUser(index) {
    data.selectedUserIndex = index;
    const selectedModule = data.modules[data.selectedModuleIndex];
    const user = selectedModule.users[index];
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("product").value = user.product;
    document.getElementById("phone").value = user.phone;
    document.getElementById("address").value = user.address;
}

// Función para limpiar el formulario del usuario
function clearUserForm() {
    data.selectedUserIndex = -1;
    const form = document.getElementById("user-form");
    form.reset();
}

document.addEventListener("DOMContentLoaded", () => {
    displayModules();
    displayUserData();
});
