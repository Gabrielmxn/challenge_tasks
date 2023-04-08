import fs from 'node:fs/promises'
import multer from 'multer';

const upload = multer({ dest: 'upload/' })

export async function ImportCsv(req, res) {
  upload.single('file')(req, res, async function (error) {
    const urlCsv = new URL(`../../upload/${req.file.filename}`, import.meta.url)
    if (error) {
      res.writeHead(404).end("Não foi possível carregar o arquivo")
    }

    const file = await fs.readFile(urlCsv)

    const tasks = file.toString()
      .split(',')
      .toString()
      .split('\r\n')
      .slice(2)
      .map(task => {
        const [title, description] = task.split(',')
        return {
          title, description
        }
      })

    tasks.map(({ title, description }) => {
      fetch('http://localhost:3333/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
    res.writeHead(204).end()
  })


}