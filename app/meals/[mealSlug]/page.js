import Image from "next/image";
import { notFound } from "next/navigation";

import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);
  if (!meal) {
    // next navigation method that calls the nearest not found page
    notFound();
    //This function stops the execution of the Page below
  }

  // Returning metadata object
  return {
    title: meal.title,
    description: meal.summary,
  };
}

// every component receives props from next JS
// props => params => [mealSlug] to access the meal path details
export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);

  // to check Meal!=null is not required here since this file has generateMetadata
  //method implemented which checks the conditions for the meal
  // if (!meal) {
  //   notFound();
  // }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          // try to avoid dangerously set inner html as much as you can
          // used package xss to monitor any vulnerable/ dangerous content
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
