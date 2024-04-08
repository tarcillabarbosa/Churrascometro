const menInput = document.getElementById('homens');
const womenInput = document.getElementById('mulheres');
const adultsInput = document.getElementById('adults_drink');
const childrenInput = document.getElementById('criancas');
const cepInput = document.getElementById('cep');

document.addEventListener('DOMContentLoaded', () => {
  const registrationData = JSON.parse(localStorage.getItem('registrationForm'));
  const managementData = JSON.parse(localStorage.getItem('managementForm'));
  if (registrationData) {
    document.getElementById('nome').value = registrationData.nome;
    document.getElementById('email').value = registrationData.email;
    document.getElementById('cpf').value = registrationData.cpf;
    document.getElementById('cep').value = registrationData.cepInput;
    document.getElementById('endereco').value = registrationData.endereco;
    document.getElementById('checkbox').checked = registrationData.checkbox === 'yes';
  }
  if (managementData) {
    document.getElementById('homens').value = managementData.homens;
    document.getElementById('mulheres').value = managementData.mulheres;
    document.getElementById('criancas').value = managementData.criancas;
    document.getElementById('adults_drink').value = managementData.adults_drink;
  }
})

function preventTyping(e) {
    if (e.key === 'e' || e.key === '-' || e.key === ',' || e.key === '.' || e.key === '+') {
      e.preventDefault();
    }
}

function preventUndefined(e) {
    if (!e.target.value) e.target.value = '0';
}
  
function setAddress(data) {
    console.log(data)
    document.getElementById('endereco').value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
}

function addressAutocomplete(e) {
    console.log('input event triggered')
    if (e.target.value.length === 9) {
      fetch(`https://viacep.com.br/ws/${e.target.value}/json/`)
        .then(response => response.json())
        .then(data => setAddress(data))
        .catch(error => console.error('Falha na requisição:', error));
    }
}

function buildTable () {
  const managementData = JSON.parse(localStorage.getItem('managementForm'));
  const tr = document.createElement('tr');

  const meat = document.createElement('td');
  meat.innerHTML = `${(0.5 * managementData.homens + 0.35 * managementData.mulheres + 0.2 * managementData.criancas).toFixed(1)} Kg`;
  tr.appendChild(meat);

  const garlicBread = document.createElement('td');
  garlicBread.innerHTML = `${(2 * managementData.homens + 2 * managementData.mulheres + 1 * managementData.criancas).toFixed(1)} uni`;
  tr.appendChild(garlicBread);
  
  const coal = document.createElement('td');
  coal.innerHTML = `${(1 * managementData.homens + 1 * managementData.mulheres + 1 * managementData.criancas).toFixed(1)} Kg`;
  tr.appendChild(coal);
  
  const salt = document.createElement('td');
  salt.innerHTML = `${(0.04 * managementData.homens + 0.04 * managementData.mulheres + 0.04 * managementData.criancas).toFixed(1)} Kg`;
  tr.appendChild(salt);
  
  const ice = document.createElement('td');
  ice.innerHTML = `${(0.5 * managementData.homens + 0.5 * managementData.mulheres + 0.5 * managementData.criancas).toFixed(1)} Kg`;
  tr.appendChild(ice);
  
  const soda = document.createElement('td');
  soda.innerHTML = `${(0.5 * managementData.homens + 0.5 * managementData.mulheres + 0.5 * managementData.criancas).toFixed(1)} L`;
  tr.appendChild(soda);
  
  const water = document.createElement('td');
  water.innerHTML = `${(0.5 * managementData.homens + 0.5 * managementData.mulheres + 0.3 * managementData.criancas).toFixed(1)} L`;
  tr.appendChild(water);
  
  const beer = document.createElement('td');
  beer.innerHTML = `${(1.0 * managementData.adults_drink).toFixed(1)} L`;
  tr.appendChild(beer);
  
  document.getElementById('tabela').appendChild(tr);
}

function handleSubmitRegistration(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  localStorage.setItem('registrationForm', JSON.stringify(data));
  e.target.reset();
  e.target.style.display = 'none';
  document.getElementById('managementForm').style.display = 'block';
}

function handleSubmitManagement(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  localStorage.setItem('managementForm', JSON.stringify(data));
  e.target.reset();
  e.target.style.display = 'none';
  document.getElementById('resultado').style.display = 'block';
  buildTable();
}

document.getElementById('registrationForm').addEventListener('submit', handleSubmitRegistration);
document.getElementById('managementForm').addEventListener('submit', handleSubmitManagement);

cepInput.addEventListener('input', addressAutocomplete);