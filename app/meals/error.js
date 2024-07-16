"use client";
//because error handling is for both client and server

// By default Next JS provides error component a prop which contains details about the error
// However it won't display the actual details of the error in order to avoid exposing some internal details
// the props can be used in order to display some specific eror code
//export default function ErrorPage({error}){
export default function ErrorPage() {
  return (
    <main className="error">
      <h1>An error occurred</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
