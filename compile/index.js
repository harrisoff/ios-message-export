const path = require('path');
const fs = require('fs');
const nexe = require('nexe');

const packageJson = fs.readFileSync(path.resolve(__dirname, '../package.json'));
const projectName = JSON.parse(packageJson).name;

nexe.compile(
  {
    flags: true,
    input: path.resolve(__dirname, '../dist/index.js'),
    output: path.resolve(__dirname, `../${projectName}`),
    nodeTempDir: 'nexe_node',
    framework: 'node',
    resourceFiles: [],
  },
  error => {
    if (error) {
      return console.error(error.message);
    }
  },
);
