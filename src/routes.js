import { Databasse } from "./database.js"
import { randomUUID } from 'node:crypto'
const database = new Databasse();

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.select('tasks');
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { 
        title, 
        description
      } = req.body;

      const newTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
      const task = database.insert('tasks',  newTask)

      console.log(task)
      return res.end('post')
    }
  },
  {
    method: 'PUT',
    path: '/tasks/:id',
    handler: (req, res) => {
      return res.end('PUT')
    }
  },
  {
    method: 'DELETE',
    path: '/tasks/:id',
    handler: (req, res) => {
      return res.end('DELETE')
    }
  },
  {
    method: 'PATCH',
    path: '/tasks/:id/complete',
    handler: (req, res) => {
      return res.end('PATCH')
    }
  },
  {
    method: 'POST',
    path: '/tasks/import',
    handler: (req, res) => {
      return res.end('import')
    }
  }
]