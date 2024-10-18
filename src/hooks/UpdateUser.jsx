import { useState } from "react";

export default function useUpdateUser() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  // Function to update the user data
  const updateUser = (updatedUser) => {
    setName(updatedUser.name || "");
    setAddress(updatedUser.address || "");
    setCompany(updatedUser.company || "");
    setEmail(updatedUser.email || "");
    setPhone(updatedUser.phone || "");
    setComment(updatedUser.comment || "");

    // Update userInfo
    setUserInfo({
      name: updatedUser.name || "",
      address: updatedUser.address || "",
      company: updatedUser.company || "",
      email: updatedUser.email || "",
      phone: updatedUser.phone || "",
      comment: updatedUser.comment || "",
    });
  };

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
    updateUser,
  };
}
