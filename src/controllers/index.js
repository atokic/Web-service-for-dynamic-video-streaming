const { getFilesPathInDir } = require('../utils/fileHelpers');
const { readFileSync } = require('fs');
const { EventEmitter } = require('events');
const path = require('path');
const baseImgPath = '../../assets/img';
var globalBufferIndex = 0;
var numListeners = 0;

class Controller {
  static async streamData(req, res) {
    const { fps } = req.query;
    const { source } = req.params;

    // no favicon
    if (source === 'favicon.ico') {
      return res.end();
    }

    const emitter = new EventEmitter();


    Controller.writeHeaders(res);
    emitter.addListener('frame', () => Controller.writeFrame(res, source));
    emitter.addListener('end', () => {
      res.end();
      emitter.removeAllListeners();
    });
    if(numListeners == 0)
    Controller.emitBufferInterval(source);
    Controller.emitTickInterval(fps, emitter, res, source);
    numListeners++;
  }

  static emitBufferInterval(source){
    const intervalId2 = setInterval(async () => {
    globalBufferIndex++;
    const imgPaths = await this.getImgPaths(source);
    
    if (globalBufferIndex > imgPaths.length) {
      globalBufferIndex =0;
    }
  }, 1000);
  }

  static writeHeaders(res) {
    res.set({
      'Cache-Control': 'no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0',
      Pragma: 'no-cache',
      Connection: 'close',
      'Content-Type': 'multipart/x-mixed-replace; boundary=--myboundary'
    });
  }

  static async writeFrame(res, source) {
    const imgPaths = await this.getImgPaths(source);
    const buffers = imgPaths.map(file => readFileSync(file));
    const buffer = buffers[globalBufferIndex];
    if (buffer) {
      res.write(`--myboundary\nContent-Type: image/jpg\nContent-length: ${buffer.length}\n\n`);
      res.write(buffer);
    }
  }

  static emitTickInterval(fps, emitter, res, source) {
    const interval = 1000 / fps;
    const intervalId = setInterval(async () => {
      emitter.emit('frame');
    }, interval);
  }

  static getImgPaths(source) {
    const localSourcePathDir = path.resolve(__dirname, baseImgPath, source);
    return getFilesPathInDir(`${localSourcePathDir}/`);
  }
}
module.exports = Controller;
