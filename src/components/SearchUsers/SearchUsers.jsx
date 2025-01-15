import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchUsers() {
    const [searchField, setSearchField] = useState("");
    const [listOfUsers, setListOfUsers] = useState([]);
    const [usersAdded, setUsersAdded] = useState({})

    let filteredUsers;

    const handleSearchChange = (e) => {
        setSearchField(e.target.value);
    };

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
            console.log(data);
            setListOfUsers(data)
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(() => {
        getUsersList();
      }, []);

      console.log(listOfUsers)

    if(listOfUsers.length !== 0){
        filteredUsers = listOfUsers.filter(
            user => {
                return(
                    user.firstName.toLowerCase().includes(searchField.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(searchField.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchField.toLowerCase())
                )
            }
        )
    }

    return(
        <div>
            <input
            type="search"
            placeholder="Search Users"
            onChange={handleSearchChange}
            value={searchField}
            />
            {searchField !== "" && 
            filteredUsers.map((userSearched)=>{
                return <div key={userSearched.id} onClick={() => setUsersAdded({...usersAdded, [userSearched.id]:false})}>{`${userSearched.firstName} ${userSearched.lastName}`}</div>
            })}
        </div>
    )
}