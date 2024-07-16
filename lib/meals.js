import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // all() is used to return multiple rows from the DB
  // this operation from db doesn't return promise, beacause sqlite doesn't use it(by default)
  // but we have created the method async() and async always returns an object wrapped in promise
  // so this method returns a promise now
  await new Promise((resolve) => setTimeout(resolve, 3000)); // intentinally adding a delay
  return db.prepare("SELECT * FROM meals").all();
}

//for single row fetch from db use get()
// for executing a single statement mot of the times insertion use run()
