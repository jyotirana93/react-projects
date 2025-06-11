import { useState } from 'react';
import './UserForm.css';

const UserForm = ({ userIDState, userFormDataState, usersListState }) => {
  const { userID, setUserID } = userIDState;
  const { addUserData, setAddUserData } = userFormDataState;
  const { setUsersList } = usersListState;
  const userId = Math.floor(Math.random() * 100) + 1;

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;

    setAddUserData((preAddUserData) => {
      return {
        ...preAddUserData,
        [name]: value,
      };
    });
  };

  const isEmpty = Object.values(addUserData).some((value) => {
    if (value.trim().length === 0) {
      return true;
    }
    return false;
  });

  const handleAddUserDataSubmit = (e) => {
    e.preventDefault();

    if (!userID) {
      setUsersList((preUsersList) => {
        return [...preUsersList, { id: userId, ...addUserData }];
      });
    }
    setUsersList((preUsersList) => {
      return preUsersList.map((user) => {
        if (user.id === userID) {
          return { id: userID, ...addUserData };
        }

        return user;
      });
    });

    setAddUserData({ firstname: '', lastname: '', desgn: '' });
    setUserID(0);
  };

  return (
    <>
      <form className="add-user-container" onSubmit={handleAddUserDataSubmit}>
        <div className="inputs-container">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={addUserData.firstname}
            onChange={handleUserDataChange}
          />
        </div>
        <div className="inputs-container">
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={addUserData.lastname}
            onChange={handleUserDataChange}
          />
        </div>
        <div className="inputs-container">
          <label htmlFor="desgn">Designation </label>
          <input
            type="text"
            name="desgn"
            id="desgn "
            value={addUserData.desgn}
            onChange={handleUserDataChange}
          />
        </div>
        <button className="add-user-btn" type="submit" disabled={isEmpty}>
          {userID ? 'Update' : 'Add'}
        </button>
      </form>
    </>
  );
};

export default UserForm;
