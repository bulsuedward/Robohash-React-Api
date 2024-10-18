import { useState } from "react";
import CardComponent from "../components/CardComponent";
import "../css/style.css";

export default function Grocery() {
  const [names, setNames] = useState([
    "Miggy",
    "Pao",
    "Clarence",
    "Russel",
    "Claude",
    "Venj",
    "Jairo",
    "Wilmer",
    "Clarence Joseph",
    "Patrick",
    "Stephen",
  ]);

  const removeName = (nameToRemove) => {
    setNames(names.filter((name) => name !== nameToRemove));
  };

  return (
    <>
      <h2 className="title">Intern Names</h2>
      <div className="intern-names">
        {names.map((item) => (
          <CardComponent key={item} onRemove={() => removeName(item)}>
            {item}
          </CardComponent>
        ))}
      </div>
    </>
  );
}
