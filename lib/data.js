const util = require('util');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', '.data');

const open = util.promisify(fs.open);
const writeFile = util.promisify(fs.writeFile);
const close = util.promisify(fs.close);
const readFile = util.promisify(fs.readFile);
const fttruncate = util.promisify(fs.ftruncate);
const unlink = util.promisify(fs.unlink);

exports.writeJSON = async (file, data) => {
  const fileDescriptor = await open(`${dataDir}/${file}.json`, 'wx');

  await writeFile(fileDescriptor, JSON.stringify(data));
  await close(fileDescriptor);
};

exports.readJSON = async (file) => {
  const data = await readFile(`${dataDir}/${file}.json`, 'utf8');
  return JSON.parse(data);
};

exports.updateJSON = async (file, data) => {
  const fileDescriptor = await open(`${dataDir}/${file}.json`, 'r+');
  await fttruncate(fileDescriptor);

  await writeFile(fileDescriptor, JSON.stringify(data));
  await close(fileDescriptor);
};

exports.deleteJSON = async (file) => unlink(`${dataDir}/${file}.json`);

exports.exists = (file) => fs.existsSync(`${dataDir}/${file}.json`);
