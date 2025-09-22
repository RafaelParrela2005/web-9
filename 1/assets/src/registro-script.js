document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createAccountForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const cpf = document.getElementById("cpf").value;
    const telephone = document.getElementById("telephone").value;
    const address = document.getElementById("address").value;

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      alert("E-mail já cadastrado.");
      return;
    }

    const newUser = { name, email, password, cpf, telephone, address };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "/1/login.html";
  });
});
