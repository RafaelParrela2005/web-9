document.addEventListener("DOMContentLoaded", () => {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (!loggedUser) {
    window.location.href = "/1/login.html";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  document.getElementById("userName").textContent = loggedUser.name;
  document.getElementById("name").value = loggedUser.name;
  document.getElementById("email").value = loggedUser.email;
  document.getElementById("password").value = loggedUser.password;
  document.getElementById("cpf").value = loggedUser.cpf;
  document.getElementById("telephone").value = loggedUser.telephone;
  document.getElementById("address").value = loggedUser.address;

  document.getElementById("updateForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const updatedUser = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      cpf: document.getElementById("cpf").value,
      telephone: document.getElementById("telephone").value,
      address: document.getElementById("address").value,
    };

    users = users.map((user) => {
      if (user.email === loggedUser.email && user.cpf === loggedUser.cpf) {
        return updatedUser;
      } else {
        return user;
      }
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

    alert("Dados atualizados com sucesso!");
    location.reload();
  });

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/1/login.html";
  });
});
