const assert = require('assert').strict;
const data = require('./data');

(async function () {
  // write
  const writeData = { name: 'Carlos' };
  await data.writeJSON('test', writeData);
  const writeResult = await data.readJSON('test');
  assert.deepStrictEqual(writeResult, writeData);

  // update
  const updateData = { name: 'Silva' };
  await data.updateJSON('test', updateData);
  const updateResult = await data.readJSON('test');
  assert.deepStrictEqual(updateResult, updateData);

  // delete
  await data.deleteJSON('test');
  // reading the file should reject as the file was deleted
  assert.rejects(
    async () => data.readJSON('test'),
    /no such file or directory/g
  );
})();
