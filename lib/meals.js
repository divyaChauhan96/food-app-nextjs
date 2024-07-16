import sql from "better-sqlite3";

const db = sql("meals.db");

export function getMeals() {
  // all() is used to return multiple rows from the DB
  return db.prepare("SELECT * FROM meals").all();
}
