const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const DEFAULT_EMAIL = 'john@doe.com';
const DEFAULT_PASSWORD = '123456';

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/fibonacci', (request, response) => {
  response.sendFile(path.join(__dirname + '/fibonacci.html'));
});

app.post('/login', (request, response) => {
  console.log(request);
  const email = request.body.email;
  const password = request.body.password;
  
  if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
    return response.send({ logado: true });
  }
  
  return response.send({ logado: false });
});

app.post('/fibonacci', (request, response) => {
  const valor = request.body.valor;
  
  if (valor > 20) {
    return response.send({ mensagem: 'Ops...isso é muito pesada para eu processar' })
  }
  
  const fibonacci = []; 

  fibonacci[0] = 0;
  fibonacci[1] = 1;
  
  for (var i = 2; i <= valor; i++) {
    fibonacci[i] = fibonacci[i - 2] + fibonacci[i - 1]; 
  } 
  
  return response.send({ mensagem: fibonacci })
})

app.listen(3000, () => console.log('rodando na porta 3000'));