const testFolder = './tests/';
const fs = require('fs');
const MJML_DIR = __dirname + "/libs/api/email/src/lib/template/"
const TEMPLATE_DIR = __dirname + "/tools/templates/"
const { exec } = require("child_process");
const mjml2html = require("mjml");
const {readFileSync,writeFileSync} = require('fs');
fs.readdirSync(MJML_DIR).forEach(file => {
  if (file.match(/\.injectable\./)) {
    return false;
  }
  let fileName = file.split('.')
  fileName.pop()
  fileName = fileName.join()
  filename = `${fileName}.html`
  let MJML_FILE_PATH = `${MJML_DIR}${file}`;
  let TEMPLATE_FILE_PATH = `${TEMPLATE_DIR}${filename}`;
  const mjmlContent = readFileSync(MJML_FILE_PATH)
  const htmlContent = mjml2html(mjmlContent.toString());
  writeFileSync(TEMPLATE_FILE_PATH, htmlContent.html);
});
