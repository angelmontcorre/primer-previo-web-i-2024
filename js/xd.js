const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.post('/login', (req, res) => {
  let e = {
    'login': false,
    'mensaje': 'Error in login'
  };
  if (students.length === 0) res.send(e);
  let login = {
    'login': false,
    'mensaje': 'Usuario o contraseña invalido'
  }
  userLogin = students.map(user => {
    let respuesta = {
      'login': false,
      'mensaje': 'Error in login'
    };
    if (user.codigo === req.body.codigo && user.clave === req.body.clave) {
      respuesta = {
        'login': true,
        'codigo': user.codigo,
        'nombre': user.nombre,
        'email': user.email,
        'mensaje': 'Welcome'
      };
      login = respuesta;
      res.send(login);
    }
  });
  res.send(login);
})

app.get('/students', (req, res) => {
  res.send(students);
});

app.get('/students/:codigo/notas', (req, res) => {
  let codigo = req.params.codigo;

  console.log("Notas");
  userNotas = notas.map(user => {
    let respuesta = {
      'login': false,
      'mensaje': 'Error in login'
    };

    if (user.codigo === req.params.codigo) {
      console.log(user.codigo);

      respuesta = {
        'login': true,
        'codigo': user.codigo,
        'notas': user.notas,
        'mensaje': 'Notas del Estudiante'
      };
      login = respuesta;
      console.log(login);
      res.send(login);
    }

  });

  res.send(userNotas[0]);

});

app.get('/notas', (req, res) => {
  res.send(notas);
});

app.listen(3000, () => {
  console.log('server started');
});