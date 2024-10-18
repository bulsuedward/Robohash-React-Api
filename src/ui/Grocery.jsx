import { useState } from "react";
import CardComponent from "../components/CardComponent";

export default function Grocery() {
  const [groceries, setGroceries] = useState([
    "diaper",
    "mayo",
    "tomato",
    "cereal",
    "bread",
  ]);

  const removeGroceries = (groceriesToRemove) => {
    setGroceries(
      groceries.filter((groceries) => groceries !== groceriesToRemove)
    );
  };
  return (
    <>
      {groceries.map((item) => (
        <CardComponent key={item} onRemove={() => removeGroceries(item)}>
          {item}
        </CardComponent>
      ))}
    </>
  );
}
