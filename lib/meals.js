import sql from "better-sqlite3";
// used sqlite for this project since it is easy to maintain local db
// remote dbs can also b used

import slugify from "slugify";
import xss from "xss";
const fs = require("node:fs");
import { Buffer } from "node:buffer";

const db = sql("meals.db");

export async function getMeals() {
  // all() is used to return multiple rows from the DB
  // this operation from db doesn't return promise, beacause sqlite doesn't use it(by default)
  // but we have created the method async() and async always returns an object wrapped in promise
  // so this method returns a promise now
  await new Promise((resolve) => setTimeout(resolve, 3000)); // intentinally adding a delay
  //throw new Error("An error happened");   //dummy error throw
  return db.prepare("SELECT * FROM meals").all();
}

//for single row fetch from db use get()
// for executing a single statement mot of the times insertion use run()

export function getMeal(slug) {
  //db.prepare("SELECT * FROM meals WHERE slug = "+slug).get() doing this way might invite sql injections
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function insertMeal(meal) {
  // used slugify to create unique path/identifier for a meal, creating duplicates will throw error
  meal.slug = slugify(meal.title, { lower: true });

  // to avoid xss attaks since instructions are an html content(dangerously set)
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  // saving image path in db and not the whole image
  // dbs aren't meant to store files

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
