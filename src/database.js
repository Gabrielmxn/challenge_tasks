import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Databasse {
  #database = {}


  constructor(){
    fs.readFile(databasePath, 'utf8').then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }

  #persist(){
		fs.writeFile(databasePath, JSON.stringify(this.#database))
	}

  select(table){
    const tasks = this.#database[table];

    return tasks;
  }

  insert(table, data){
    if (Array.isArray(this.#database[table])){
			this.#database[table].push(data)
		} else {
			this.#database[table] = [data]
		}

    console.log(data)
    this.#persist();
    return data;
  }

  
}