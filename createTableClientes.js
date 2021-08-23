const fs = require('fs');
// JSON data
const data = require('./clientes.json');
const { buildPathClientes } = require('./buildPaths');

const createRow = (item) => `
  <tr>
    <td>${item.idCliente}</td>
    <td>${item.NombreCompania}</td>
    <td>${item.NombreContacto}</td>
  </tr>
`;

const createTable = (rows) => `
  <table class="table-striped">
   <caption>
      <h1>Listado de Clientes<h1>
    </caption>
    <tr>
        <th>Cliente</td>
        <th>Nombre</td>
        <th>Contacto</td>
    </tr>
    ${rows}
  </table>
`;
const createHtml = (table) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
      ${table}
    </body>
  </html>
`;
const doesFileExist = (filePath) => {
	try {
		fs.statSync(filePath); // get information of the specified file path.
		return true;
	} catch (error) {
		return false;
	}
};
function create(){
    try {
        /* Check if the file for `html` build exists in system or not */
        if (doesFileExist(buildPathClientes)) {
            console.log('Deleting old build file');
            /* If the file exists delete the file from system */
            fs.unlinkSync(buildPathClientes);
        }
        /* generate rows */
        const rows = data.map(createRow).join('');
        /* generate table */
        const table = createTable(rows);
        /* generate html */
        const html = createHtml(table);
        /* write the generated html to file */
        fs.writeFileSync(buildPathClientes, html);
        console.log('Succesfully created an HTML table');
    } catch (error) {
        console.log('Error generating table', error);
    }
}
module.exports = {
    "create":create
}
