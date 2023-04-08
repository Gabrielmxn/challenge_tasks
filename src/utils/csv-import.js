import fs from 'node:fs'
import { parse } from 'csv-parse'
import multer from 'multer';

const upload = multer({ dest: 'upload/' })

export async function ImportCsv(req, res) {
  upload.single('file')(req, res, function (error) {
    const urlCsv = new URL(`../../upload/${req.file.filename}`, import.meta.url)
    if (error) {
      res.writeHead(404).end("Não foi possível carregar o arquivo")
    }
    const file = fs.createReadStream(urlCsv)

    const parseFile = parse();

    file.pipe(parseFile);

    parseFile.on("data", async ([title, description]) => {
      if(title !== 'title' && description !== 'description'){
        fetch("http://localhost:3333/tasks", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({title, description})
        })
      }
    });
   
    res.writeHead(204).end()
  })


}