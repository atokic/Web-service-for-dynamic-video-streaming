const express = require('express');
const path = require('path');
const Controller = require('./controllers');
class App {
  static initialize() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.app.use(express.static(path.resolve(__dirname, '../assets/') + '/'));
    this.app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../assets/html/index.html')));
    this.app.get('/:source', Controller.streamData);
  }
  static start() {
    this.initialize();
    this.app.listen(this.port, () => console.log(`App listening on: http://localhost:${this.port}`));
  }
}

module.exports = App;
