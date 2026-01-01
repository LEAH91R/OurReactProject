import { useState } from "react";
// import Timer from "./Timer.jsx";

export function Home() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [meals, setMeals] = useState("");
  const remove = () => {
    console.log("removing settings");
    setName("");
    setTime("");
    setLocation("");
    setMeals(0);

  };


  return (
    <div>
      {/* <h1>עמוד בית</h1> */}
      <menu></menu>
      <input name="name" type="text" placeholder="פרשת השבוע" value={name} onChange={(e) => setName(e.target.value)} />
      <input name="time" type="time" placeholder="שעת כניסת השבת" value={time} onChange={(e) => setTime(e.target.value)}/>
      <select name="location" value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="atHome">בבית</option>
        <option value="traveling">נוסעים</option>
      </select>
      <input name="meals" type="number" placeholder="כמות הסעודות שאוכלים בבית" min="0" max="3" value={meals} onChange={(e) => setMeals(Number(e.target.value))} />
      <button onClick={remove}>איפוס הגדרות</button>
      {/* {time ? <Timer time={time} /> : null} */}
    </div>
  );
}      