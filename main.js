const http = require("http");
const fs = require("fs");
const axios = require("axios").default;
const tablaProveedores = require("./createTableProveedores")
const tablaClientes = require("./createTableClientes")
http
  .createServer((req, res) => {
    if (req.url === "/api/proveedores") {
      const url =
        "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
      axios
        .get(url)
        .then((response) =>
          fs.writeFile(
            "./proveedores.json",
            JSON.stringify(response.data),
            "utf-8",
            (err) => {
              if (err) console.log(err);
            }
          )
        )
        .then(tablaProveedores.create).then(()=>{
            fs.readFile("./index.html", null, (err,data)=>{
                if(err){
                    console.log(err)
                    res.writeHead(404)
                }else{
                    res.write(data)
                }
                res.end()
            })
        })
    } else if (req.url === "/api/clientes") {
      const url =
        "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";
      axios
        .get(url)
        .then((response) =>
          fs.writeFile(
            "./clientes.json",
            JSON.stringify(response.data),
            "utf-8",
            (err) => {
              if (err) console.log(err);
            }
          )
        )
        .then(tablaClientes.create).then(()=>{
            fs.readFile("./index.html", null, (err,data)=>{
                if(err){
                    console.log(err)
                    res.writeHead(404)
                }else{
                    res.write(data)
                }
                res.end()
            })
        })
    }
  })
  .listen(8081);