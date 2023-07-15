const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

let corsOptions = {
  origin: true,
  methods: ['get', 'post', 'delete', 'head', 'put', 'path'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'www/public')));

const url = [
  '/',
  '/api'
];

app.get(url, (req, res) => {
  res.sendFile(path.join(__dirname + '/www/views', 'index.html'));
});

const loadRoutes = (folder) => {
  fs.readdir(folder, (err, files) => {
    files.forEach((file) => {
      if (fs.statSync(folder + file).isFile()) {
        require(folder + file)(app);
      } else {
        loadRoutes(folder + file + '/');
      };
    });
  });
};
const routesFolder = './www/routes/';
loadRoutes(routesFolder);

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log('Сервер готов. Порт сервера: ' + PORT + '.');
});