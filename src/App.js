import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [name, setName] = useState([]);
  const [count, setCount] = useState("");
  const [input, setInput] = useState("");

  const fetchName = async () => {
    const data = await fetch(`https://randomuser.me/api/?results=${count}`);
    const json = await data.json();
    const nameAPI = json?.results;
    setName(nameAPI);
  };
  useEffect(() => {
    if (count) {
      fetchName();
    }
  }, [count]);

  const handleFormSubmit = (e) => {
    setCount(input);
  };

  return (
    <div className="App">
      <h3>Enter number to get random name</h3>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => handleFormSubmit()} type="submit">
        Submit
      </button>
      <h2>
        <ul>
          {name.map((result, index) => {
            if (index < count) {
              return (
                <li key={result.login.uuid}>
                  {result.name.first} {result.name.last}
                </li>
              );
            }
          })}
        </ul>
      </h2>
    </div>
  );
}
