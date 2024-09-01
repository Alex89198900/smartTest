import { useEffect, useState } from "react";
//import api from './fakeApi/api'
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { RootState } from "./store/store";
import "./App.css";
import { fetchUsers, searchUsers, sortedUsers } from "./store/redusers/users";

function App() {
  const users = useAppSelector((state: RootState) => {
    const all = state.users.users;
    const filterId = state.users.filteredUsers;
    if (filterId.value === "") {
      return all;
    } else {
      return all.filter((user) =>
        user[filterId.keySearch]
          .toString()
          .toLowerCase()
          .includes(filterId.value.toLowerCase())
      );
    }
  });
  const [search, setSearch] = useState({ keySearch: "name", value: "" });
  const dispatch = useAppDispatch();
  const onClick = (arg: string) => {
    dispatch(sortedUsers(arg));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, value: e.target.value });
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(searchUsers({ keySearch: search.keySearch, value: search.value }));
  }, [search]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const target = e.target.value;
    setSearch({ ...search, keySearch: target });
  };
  return (
    <>
      <select name="query" id="select" onChange={handleSelect} className="mySelect">
        <option value="name" defaultChecked>
          Name
        </option>
        <option value="username">Username</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>
      <input
        type="text"
        value={search.value}
        onChange={handleChange}
        id="text"
        placeholder={search.keySearch}
        className="myInput"
      />
      <table className="styled-table">
        <thead>
          <tr>
            <th onClick={() => onClick("name")}>Name</th>
            <th onClick={() => onClick("username")}>Username</th>
            <th onClick={() => onClick("phone")}>Phone</th>
            <th onClick={() => onClick("email")}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
