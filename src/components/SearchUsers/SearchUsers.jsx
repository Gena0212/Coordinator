import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchUsers() {
    const [searchField, setSearchField] = useState("");

    let listOfUsers;

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
            listOfUsers = data;
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(() => {
        getUsersList();
      }, []);

    return(
        <input
        type="search"
        placeholder="Search Users"
        onChange={handleSearchChange}
        value={searchField}
        />
    )
}