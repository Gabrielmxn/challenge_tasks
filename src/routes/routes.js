import { Databasse } from "../db/database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "../utils/build-route-path.js";
const database = new Databasse();

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
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { 
        title, 
        description
      } = req.body;

      const task = database.update('tasks', id, {
        title,
        description
      })
      return res.writeHead(204).end(JSON.stringify({
        title,
        description
      }))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      return res.end('DELETE')
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      return res.end('PATCH')
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/import'),
    handler: (req, res) => {
      return res.end('import')
    }
  }
]