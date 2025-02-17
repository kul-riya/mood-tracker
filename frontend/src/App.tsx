import "./App.css";
import { useState } from "react";

function App() {
  const [mood, setMood] = useState("");

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("heree i am");

    const moodValue = mood;

    console.log(moodValue);

    const result = await fetch("http://localhost:5000/post-mood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood: mood }),
    });

    console.log(await result.json());
  };
  return (
    <>
      <header className="sticky w-full top-0 mx-auto flex items-center p-2 sm:p-4 bg-amber-200">
        <h1 className="mx-auto text-4xl style-script-regular">How's life?</h1>
      </header>

      <main className="my-4 mx-2 sm:mx-4 lg:mx-8 p-2 sm:p-4 lg:p-8">
        <div className="flex items-center justify-around">
          <div className="text-2xl">Today</div>
          <div className="">
            <form onSubmit={onSubmit}>
              <select
                name="mood"
                id="mood"
                onChange={(e) => setMood(e.target.value)}
              >
                <option value="happy">Happy!</option>
                <option value="sad">Sad :</option>
              </select>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
