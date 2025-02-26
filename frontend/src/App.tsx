import "./App.css";
import { Key, useEffect, useState } from "react";
import LoggedMood from "./components/loggedMood";

function App() {
  const [mood, setMood] = useState("");
  const [log, setLog] = useState([]);

  useEffect(() => {
    fetchLog();
  }, []);

  const fetchLog = async () => {
    const result = await fetch("http://localhost:5000/", {
      method: "GET",
    });
    const data = await result.json();
    setLog(data);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(mood);

    const result = await fetch("http://localhost:5000/post-mood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood: mood }),
    });

    console.log(await result.json());
    fetchLog();
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
                <option value="empty"></option>
                <option value="happy">Happy!</option>
                <option value="sad">Sad :</option>
              </select>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className="flex justify-center">
          <ul className="mx-2 sm:mx-3 w-[1000px]">
            {log.map(
              (entry: { mood: string; timestamp: string }, index: Key) => (
                <li key={index}>
                  <LoggedMood
                    mood={entry.mood}
                    timestamp={entry.timestamp}
                    onDelete={function (): void {}}
                    onUpdate={function (): void {}}
                  ></LoggedMood>
                </li>
              )
            )}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
