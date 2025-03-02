import "./App.css";
import { Key, useEffect, useState } from "react";
import LoggedMood from "./components/loggedMood";
import PreferredActivity from "./components/preferredActivity";

function App() {
  const [mood, setMood] = useState("");
  const [log, setLog] = useState([]);
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    fetchLog();
  }, []);

  const fetchLog = async () => {
    const result = await fetch("http://localhost:5000/", {
      method: "GET",
    });
    const data = await result.json();
    console.log(data);

    setLog(data);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(mood);

    const result = await fetch(`http://localhost:5000/post-mood/${mood}`, {
      method: "POST",
    });

    console.log(await result.json());

    fetchLog();
  };

  const onDelete = async (id: Number) => {
    const result = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    });

    const data = await result.json();
    if (result.status === 200) {
      fetchLog();
    } else {
      console.log(data["message"]);
    }
  };

  const onGetPreferences = async () => {
    const result = await fetch(
      `http://localhost:5000/get-preferences/${mood}`,
      {
        method: "GET",
      }
    );
    const data = await result.json();
    console.log(data);
    setPreferences(data["suggestions"]);
  };

  return (
    <>
      <header className="sticky w-full top-0 mx-auto flex items-center p-2 sm:p-4 bg-amber-200">
        <h1 className="mx-auto text-4xl style-script-regular">How's life?</h1>
      </header>
      <main className="my-4 mx-2 sm:mx-4 lg:mx-8 p-2 sm:p-4 lg:p-8 flex justify-between">
        <div className="flex-4 flex flex-col items-center justify-around ">
          <div className="centre-main ">
            <div className="today-select flex gap-8 items-center">
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
              <button
                onClick={onGetPreferences}
                className="py-3 px-5 bg-green-300 rounded-full"
              >
                Get preferences
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <ul className="mx-2 sm:mx-3 w-[1000px]">
              {log.map(
                (
                  entry: { id: Number; mood: string; timestamp: string },
                  index: Key
                ) => (
                  <li key={index}>
                    <LoggedMood
                      mood={entry.mood}
                      timestamp={entry.timestamp}
                      onDelete={() => onDelete(entry.id)}
                      onUpdate={function (): void {}}
                    ></LoggedMood>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <ul>
            {preferences.map(
              (
                entry: { activity: string; description: string },
                index: Key
              ) => {
                return (
                  <li key={index}>
                    <PreferredActivity
                      activity={entry.activity}
                      description={entry.description}
                      selected={false}
                    ></PreferredActivity>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
