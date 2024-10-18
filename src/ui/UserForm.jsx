import UserData from "../hooks/UserData";

function UserForm() {
  // // Input Changes Handler
  const {
    nickname,
    setNickname,
    age,
    setAge,
    address,
    setAddress,
    userInfo,
    setUserInfo,
  } = UserData();

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const handleChangeAge = (e) => {
    setAge(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = { nickname, age, address };
    setUserInfo(formData);
  };
  return (
    <>
      <h2 className="form-title">User Form</h2>
      <form onSubmit={handleOnSubmit} className="user-form">
        <div>
          <label htmlFor="NickName:"></label>
          <input
            type="text"
            value={nickname}
            onChange={handleChangeNickname}
            placeholder="Enter your Nickname"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={age}
            onChange={handleChangeAge}
            placeholder="Enter your Age"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={address}
            onChange={handleChangeAddress}
            placeholder="Enter your Address"
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      {userInfo && (
        <div className="user-info">
          <h3 className="Nickname">Hi! {userInfo.nickname}</h3>
          <p className="Age">You're age is: {userInfo.age}</p>
          <p className="Address">You lived in: {userInfo.address}</p>
        </div>
      )}
    </>
  );
}

export default UserForm;
