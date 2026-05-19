import { useState, useEffect, useCallback } from "react";
import CellInput from "./components/cellInput/CellInput";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState(2);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [removedIds, setRemoveIds] = useState([]);

  const remainingUser = users.filter((user) => !removedIds.includes(user.id));
  const visibleUsers = remainingUser.slice(0, rows);
  const numericalFeilds = ["salary", "age"];

  const changeRowHandler = (e) => {
    const { value } = e.target;
    const num = Number(value);
    const isNumber = Number.isNaN(num);

    if (isNumber) {
      setMessage("Pls enter a numerical value");
      return;
    }

    if (!remainingUser.length) {
      setMessage("No more users");
      return;
    }

    if (num > remainingUser.length) {
      setMessage(`Pls enter a number from 1 to ${remainingUser.length}`);
      return;
    }

    setRows(num);

    setMessage("");
  };

  const changeHandler = useCallback((e, rowIndex) => {
    const { name, value } = e.target;

    const isNumerical = numericalFeilds.includes(name);
    setUsers((preData) => {
      return preData.map((data, i) => {
        if (rowIndex === i) {
          return {
            ...data,
            [name]: isNumerical ? +value : value,
          };
        }
        return data;
      });
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log({ users });
  };

  const removeHandler = (id) => {
    const updatedUsers = visibleUsers.filter((user) => user.id !== id);
    setRemoveIds((prevData) => [...prevData, id]);

    setRows(updatedUsers.length);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();

        setUsers(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="table-main">
        <div className="row-input">
          <label>Pls enter number of rows to be visible</label>
          <input type="text" value={rows} onChange={changeRowHandler} />
        </div>
        <span style={{ color: "red", marginTop: "-1.5rem" }}> {message}</span>
        {isLoading ? (
          <p>...loading</p>
        ) : (
          <div className="table-container">
            {visibleUsers.length ? (
              <form className="table-form" onSubmit={submitHandler}>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Website</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleUsers.map((data, rowIndex) => {
                      const hiddenFields = ["address", "company"];

                      return (
                        <tr key={data.id}>
                          {Object.keys(data)
                            .filter((key) => !hiddenFields.includes(key))
                            .map((key, cellIndex) => {
                              const isDisabled = key === "id" ? true : false;

                              return (
                                <td key={key}>
                                  <CellInput
                                    disabled={isDisabled}
                                    name={key}
                                    value={data[key]}
                                    changeHandler={changeHandler}
                                    rowIndex={rowIndex}
                                  />
                                </td>
                              );
                            })}
                          <td>
                            <button onClick={() => removeHandler(data.id)}>
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <button className="table-button" type="submit">
                  Submit
                </button>
              </form>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
