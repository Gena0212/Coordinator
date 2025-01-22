import axios from "axios";
import { useEffect, useState } from "react";
import "./SearchUsers.scss"
import SearchList from "../SearchList/SearchList";
import AddedUsers from "../AddedUsers/AddedUsers";
import Button from "../Button/Button";


export default function SearchUsers({usersAdded, setUsersAdded, handleInputChange, formInputs, handleSubmit, errMessage}) {
    const [listOfUsers, setListOfUsers] = useState([]);

    let filteredUsers;

    const getUsersList = async () => {
        const authToken = localStorage.getItem("authToken");

        try {
            const { data } = await axios.get(
              `${import.meta.env.VITE_API_BASE_URL}/users/list`,
              {
                headers: {
                  authorisation: `Bearer ${authToken}`,
                }, 
              }
            );
            setListOfUsers(data)
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(() => {
        getUsersList();
      }, []);



    if(listOfUsers.length !== 0){
        filteredUsers = listOfUsers.filter(
            user => {
                const name = `${user.firstName} ${user.lastName}`
                return(
                    name.toLowerCase().includes(formInputs.searchField.toLowerCase()) ||
                    user.email.toLowerCase().includes(formInputs.searchField.toLowerCase())
                )
            }
        )
    }

    return(
        <div className="search">
          <label htmlFor='searchField' className="search__label">Search:</label>
          <input
          name='searchField'
          type="search"
          placeholder="Search Users"
          onChange={handleInputChange}
          value={formInputs.searchField}
          className="search__input"
          />
          <Button className='button--form' onClick={handleSubmit}>Create Group</Button>
          {usersAdded.users.length !== 0 && <AddedUsers usersAdded={usersAdded} setUsersAdded={setUsersAdded}/>}
          {formInputs.searchField !== "" && 
          <div className="search__scroll">
            <SearchList filteredUsers={filteredUsers} usersAdded={usersAdded} setUsersAdded={setUsersAdded}/>
          </div>
          }
          {errMessage && <p>{errMessage}</p>}
        </div>
        
    )
}