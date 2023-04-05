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

  update(table, id, data){
    const { title, description } = data
    const indexTask = this.#database[table].findIndex(task => task.id === id);

    if (indexTask !== -1){
      let task = this.#database[table][indexTask];
      const newTask = { ...task, id, title, description, updated_at: new Date()}
      this.#database[table][indexTask] = newTask
      this.#persist()
    }else {
      console.log("Não foi possível atualizar o seu dados.")
    }
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