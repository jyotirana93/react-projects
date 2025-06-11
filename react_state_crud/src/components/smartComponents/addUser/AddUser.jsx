import { useState } from 'react';

import UserForm from '../../uiComponents/userForm/UserForm';
import UserTable from '../../uiComponents/userTable/UserTable';
import './AddUser.css';

const usersMockData = [
  { id: 1, firstname: 'John', lastname: 'Deo', desgn: 'Marketing' },
  { id: 2, firstname: 'Josh', lastname: 'Patrick', desgn: 'Sales' },
  { id: 3, firstname: 'Jane', lastname: 'Deo', desgn: 'HR' },
  { id: 4, firstname: 'Anna', lastname: 'Dash', desgn: 'Admin' },
];

const AddUser = () => {
  const [userID, setUserID] = useState(0);
  const [addUserData, setAddUserData] = useState({
    firstname: '',
    lastname: '',
    desgn: '',
  });
  const [usersList, setUsersList] = useState(usersMockData);

  return (
    <>
      <title>Add User</title>
      <h1>Add User</h1>
      <div className="add-user-page">
        <UserForm
          userIDState={{ userID, setUserID }}
          userFormDataState={{ addUserData, setAddUserData }}
          usersListState={{ usersList, setUsersList }}
        />

        <UserTable
          userIDState={{ setUserID }}
          userFormDataState={{ addUserData, setAddUserData }}
          usersListState={{ usersList, setUsersList }}
        />
      </div>
    </>
  );
};

export default AddUser;
