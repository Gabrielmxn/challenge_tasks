import http from 'node:http';
import { routes } from './routes.js';


const server = http.createServer(async (req, res) => {
  const { method, url} = req;

  const route = routes.find( route => {
    return route.method === method && route.path === url;
  })

  console.log(route)

  return res.writeHead(404).end()
})


server.listen(3333, () => {
  console.log('hello')
})