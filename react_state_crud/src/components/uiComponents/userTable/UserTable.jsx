import { useState } from 'react';
import editSvg from '../../../assets/edit.svg';
import deleteSvg from '../../../assets/delete.svg';

const UserTable = ({ userIDState, userFormDataState, usersListState }) => {
  const { setUserID } = userIDState;
  const { setAddUserData } = userFormDataState;
  const { usersList, setUsersList } = usersListState;

  const handleEditUserDataClick = (e, personData) => {
    e.preventDefault();

    const { id, fname, lname, desgn } = personData;
    setUserID(id);

    setAddUserData((preUserData) => {
      return {
        ...preUserData,
        firstname: fname,
        lastname: lname,
        desgn,
      };
    });
  };
  const handleDeleteUserDataClick = (e, userId) => {
    e.preventDefault();

    setUsersList((preUsersList) => {
      return preUsersList.filter((user) => user.id !== userId);
    });
  };
  return (
    <>
      <div className="table-container">
        {!usersList.length ? (
          <p>No Data</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Designation</th>
                <th colSpan={'2'}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList?.map((person, i) => {
                const userData = {
                  id: person.id,
                  fname: person.firstname,
                  lname: person.lastname,
                  desgn: person.desgn,
                };
                return (
                  <tr key={person.id}>
                    <td>{i + 1}</td>
                    <td>{person.firstname}</td>
                    <td>{person.lastname}</td>
                    <td>{person.desgn}</td>
                    <td>
                      <button
                        onClick={(e) => handleEditUserDataClick(e, userData)}
                        title="Edit"
                        className="edit-user-btn"
                      >
                        <img src={editSvg} alt="edit-button" />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) => handleDeleteUserDataClick(e, person.id)}
                        title="Delete"
                        className="delete-user-btn"
                      >
                        <img src={deleteSvg} alt="delete-button" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default UserTable;
