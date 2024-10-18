import { useState, useEffect } from "react";

function UserData() {
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  // Log submitted data after form submission
  useEffect(() => {
    if (userInfo) {
      console.log("User Data Submitted:", userInfo);
    }
  }, [userInfo]);
  return {
    nickname,
    setNickname,
    age,
    setAge,
    address,
    setAddress,
    userInfo,
    setUserInfo,
  };
}

export default UserData;
