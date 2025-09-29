function showPage(pageId) {
  document.querySelectorAll('.container').forEach(container => {
    container.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('recoveryEmail').value;
  const errorElement = document.getElementById('recoveryEmailError');
  const successElement = document.getElementById('recoverySuccess');
  
  if (!validateEmail(email)) {
    errorElement.style.display = 'block';
    successElement.style.display = 'none';
    return;
  }
  
  errorElement.style.display = 'none';
  successElement.style.display = 'block';
  
  setTimeout(() => {
    showPage('loginPage');
  }, 2000);
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  let hasError = false;
  
  if (name.length < 3) {
    document.getElementById('nameError').style.display = 'block';
    hasError = true;
  } else {
    document.getElementById('nameError').style.display = 'none';
  }
  
  if (!validateEmail(email)) {
    document.getElementById('emailError').style.display = 'block';
    hasError = true;
  } else {
    document.getElementById('emailError').style.display = 'none';
  }
  
  if (password !== confirmPassword) {
    document.getElementById('passwordError').style.display = 'block';
    hasError = true;
  } else {
    document.getElementById('passwordError').style.display = 'none';
  }
  
  if (!hasError) {
    document.getElementById('registerSuccess').style.display = 'block';
    setTimeout(() => {
      showPage('loginPage');
    }, 2000);
  }
});

document.getElementById('password').addEventListener('input', function(e) {
});

// Login leva para Home
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  showPage('homePage');
});

// CRUD de veículos
let veiculos = [];

function validacaoMarca(marca) {
  const valido = marca.trim().length >= 2;
  document.getElementById('marcaError').style.display = valido ? 'none' : 'block';
  return valido;
}

function validacaoModelo(modelo) {
  const valido = modelo.trim().length >= 3;
  document.getElementById('modeloError').style.display = valido ? 'none' : 'block';
  return valido;
}

function validacaoAno(ano) {
  const valido = /^[0-9]{4}$/.test(ano);
  document.getElementById('anoError').style.display = valido ? 'none' : 'block';
  return valido;
}

document.getElementById('homeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const ano = document.getElementById('ano').value;

  const marcaValida = validacaoMarca(marca);
  const modeloValido = validacaoModelo(modelo);
  const anoValido = validacaoAno(ano);

  if (marcaValida && modeloValido && anoValido) {
    veiculos.push({ marca, modelo, ano });
    renderizarTabela();
    document.getElementById('veiculoSucesso').style.display = 'block';
    e.target.reset();

    setTimeout(() => {
      document.getElementById('veiculoSucesso').style.display = 'none';
    }, 2000);
  }
});

function renderizarTabela() {
  const tabela = document.getElementById('veiculoTabela');
  const colunaRemover = document.getElementById('colunaRemover');
  tabela.innerHTML = "";
  colunaRemover.innerHTML = "";

  veiculos.forEach((v, index) => {
    
    const row = `<tr>
      <td>${v.marca}</td>
      <td>${v.modelo}</td>
      <td>${v.ano}</td>
    </tr>`;
    tabela.innerHTML += row;

    
    const btn = document.createElement("button");
    btn.className = "deletar-bt";
    btn.innerText = "Remover";
    btn.onclick = () => deletarVeiculo(index);
    colunaRemover.appendChild(btn);
  });
}

function deletarVeiculo(index) {
  veiculos.splice(index, 1);
  renderizarTabela();
}

function deletarTudo() {
  veiculos = [];
  renderizarTabela();
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');

    if(page ==='forgot'){
        showPage('forgotPasswordPage');
    }else if(page ==='register'){
        showPage('registerPage');
    }else if(page ==='home'){
        showPage('homePage');
    }else{
        showPage('loginPage');
    }
});

// Página inicial
document.addEventListener('DOMContentLoaded', function() {
  showPage('loginPage');
});