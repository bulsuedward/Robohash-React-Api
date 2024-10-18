import { useState, useEffect } from "react";
import NameComponent from "../components/props/NameComponent";
import JobComponent from "../components/props/JobComponent";
import HeightComponent from "../components/props/HeightComponent";

export default function View() {
  const [name, setname] = useState("Edward");
  const [job, setJob] = useState("Intern");
  const [height, setHeight] = useState("5'6");
  return (
    <>
      <NameComponent name={name} />
      <JobComponent job={job} />
      <HeightComponent height={height} />
    </>
  );
}
