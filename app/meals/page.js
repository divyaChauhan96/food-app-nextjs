import Link from "next/link";

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meal-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
import LoadingMeals from "@/components/meals/loading-meals";

export const metadata = {
  title: "Explore-Meals",
  description: "Meals from all over the world!",
};

async function MealsListComponent() {
  const mealsList = await getMeals();
  return (
    <main className={classes.main}>
      <MealsGrid meals={mealsList} />
    </main>
  );
}

// in Vanilla React we can't make component functions async but here we can
export default async function MealsPage() {
  // making the whole component use async-await would delay rendering, instead
  // it would be a better choice to show loading for the data that is being fetched from the db
  // const mealsList = await getMeals();
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      {/* Suspense is a React component here, helps loading a fallback meanwhile waiting for the content */}
      <Suspense fallback={<LoadingMeals />}>
        <MealsListComponent />
      </Suspense>
    </>
  );
}
