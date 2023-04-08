import { Databasse } from "../db/database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "../utils/build-route-path.js";
import { ImportCsv } from "../utils/csv-import.js";

import multer from "multer";

const database = new Databasse();
const upload = multer({ dest: "upload/" })

export const config = {
  api: {
    bodyParser: false
  }
}
export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks');
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      try{
        const {
          title,
          description
        } = req.body;
  
        if (title !== undefined && description !== undefined && title !== '' && description !== '') {
  
          const newTask = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date(),
          }
          database.insert('tasks', newTask)
    
          return res.writeHead(204).end()
        }else{
          throw new Error("O title ou description não estão definido")
        }
      }catch(error){
        return res.writeHead(404).end(JSON.stringify({error: error.message.toString()}))
      }
     
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      try {
        const { id } = req.params
        const {
          title,
          description
        } = req.body;

        if (title !== undefined && description !== undefined && title !== '' && description !== '') {
          const task = database.update('tasks', id, {
            title,
            description
          })
          return res.writeHead(204).end()
        }else {
          throw new Error("O title ou description não estão definido")
        }
      } catch (error) {

        return res.writeHead(404).end(JSON.stringify({error: error.message.toString()}))
      }
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const task = database.delete('tasks', id)
      return res.writeHead(204).end(JSON.stringify(task))
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      const task = database.completedTask('tasks', id)
      return res.writeHead(204).end(JSON.stringify(task))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/import/tasks'),
    handler: async (req, res) => {
      await ImportCsv(req, res);
    }
  }
]