import axios from "axios";
import { useEffect, useState } from "react";
import "./SearchUsers.scss"

export default function SearchUsers({usersAdded, setUsersAdded, handleInputChange, formInputs}) {
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
                return(
                    user.firstName.toLowerCase().includes(formInputs.searchField.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(formInputs.searchField.toLowerCase()) ||
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
          {formInputs.searchField !== "" && 
          filteredUsers.map((userSearched)=>{
              return <p key={userSearched.id} onClick={() => setUsersAdded({...usersAdded, [userSearched.id]:0})}>{`${userSearched.firstName} ${userSearched.lastName}`}</p>
          })}
        </div>
        
    )
}