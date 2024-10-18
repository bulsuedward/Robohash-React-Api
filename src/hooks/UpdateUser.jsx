import React, { useState } from "react";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  return {
    name,
    setName,
    address,
    setAddress,
    company,
    setCompany,
    email,
    setEmail,
    phone,
    setPhone,
    comment,
    setComment,
    userInfo,
    setUserInfo,
  };
}
