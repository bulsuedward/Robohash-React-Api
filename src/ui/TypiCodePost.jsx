import React, { useEffect, useState } from "react";
import axios from "axios";
export default function RoboHash() {
  const [jsonplaceholder, setjsonPlaceholder] = useState();

  useEffect(() => {
    axios({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
    }).then((res) => {
      setjsonPlaceholder(res.data);
    });
  }, []);

  return (
    <>
      {jsonplaceholder !== undefined &&
        jsonplaceholder.map((item) => <div>{item.title}</div>)}
    </>
  );
}
