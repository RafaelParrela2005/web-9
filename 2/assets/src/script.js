document.addEventListener("DOMContentLoaded", function () {

  //Cadastro de Fornecedores
  const supplierForm = document.getElementById("form-fornecedor");
  supplierForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const supplier = {
      cnpj: document.getElementById("supplier-cnpj").value,
      name: document.getElementById("supplier-name").value,
      telephone: document.getElementById("supplier-telephone").value,
      address: document.getElementById("supplier-address").value,
    };

    let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
    const index = suppliers.findIndex(f => f.cnpj === supplier.cnpj);

    if (index !== -1) {
      suppliers[index] = supplier;
      console.log("Fornecedor atualizado:", supplier);
    } else {
      suppliers.push(supplier);
      console.log("Fornecedor cadastrado:", supplier);
    }

    localStorage.setItem("suppliers", JSON.stringify(suppliers));
    supplierForm.reset();
  });

////////////////////////////////////////////////////////////////////////////////

  //Cadastro de Produtos
  const productForm = document.getElementById("form-produto");
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const product = {
      id: document.getElementById("product-id").value,
      name: document.getElementById("product-name").value,
      quantity: document.getElementById("product-quantity").value,
      price: document.getElementById("product-price").value,
      cnpj: document.getElementById("product-cnpj").value
    };

    const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
    if (!suppliers.some(f => f.cnpj === product.cnpj)) {
      alert("CNPJ inválido! O produto deve estar associado a um fornecedor cadastrado.");
      return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    const index = products.findIndex(p => p.id === product.id);

    if (index !== -1) {
      products[index] = product;
      console.log("Produto atualizado:", product);
    } else {
      products.push(product);
      console.log("Produto cadastrado:", product);
    }

    localStorage.setItem("products", JSON.stringify(products));
    productForm.reset();
  });

////////////////////////////////////////////////////////////////////////////////

  //Listar Fornecedor por Produto
  document.getElementById("btn-list-supplier").addEventListener("click", () => {
    const id = document.getElementById("search-product-id").value;
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
    const ul = document.getElementById("supplier-list");
    ul.innerHTML = "";

    const product = products.find(p => p.id === id);
    if (!product) {
      ul.innerHTML = "<li>Produto não encontrado.</li>";
      return;
    }

    const supplier = suppliers.find(f => f.cnpj === product.cnpj);
    if (supplier) {
      const li = document.createElement("li");
      li.textContent = `${supplier.name} - CNPJ: ${supplier.cnpj} - Telefone: ${supplier.telephone} - Endereço: ${supplier.address}`;
      ul.appendChild(li);
    } else {
      ul.innerHTML = "<li>Fornecedor não encontrado.</li>";
    }
  });

////////////////////////////////////////////////////////////////////////////////

  //Listar Produtos por Fornecedor
  document.getElementById("btn-list-products").addEventListener("click", () => {
    const cnpj = document.getElementById("search-supplier-cnpj").value;
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const ul = document.getElementById("product-list");
    ul.innerHTML = "";

    const supplierProducts = products.filter(p => p.cnpj === cnpj);
    if (supplierProducts.length === 0) {
      ul.innerHTML = "<li>Nenhum produto encontrado para este fornecedor.</li>";
      return;
    }

    supplierProducts.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - ID: ${p.id} - Quantidade: ${p.quantity} - Preço: ${p.price}`;
      ul.appendChild(li);
    });
  });

});
