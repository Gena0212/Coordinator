import { useState } from "react";
import SearchUsers from "../SearchUsers/SearchUsers";
import axios from "axios";
 
export default function CreateGroupForm(){
    const [usersAdded, setUsersAdded] = useState({})
    const [formInputs, setFormInputs] = useState({
        groupName: "",
        searchField: "",
      });

    const authToken = localStorage.getItem('authToken');


    const handleInputChange = (e) => {
        setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const groupData = {
            groupName: formInputs.groupName, 
            members: usersAdded
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/groups`, groupData, 
                {
                    headers: {
                      authorisation: `Bearer ${authToken}`,
                    },
                }
            );
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <form>
            <label htmlFor="groupName">Name For Your Group:</label>
            <input
            type="text"
            name="groupName"
            value={formInputs.groupName}
            onChange={handleInputChange}
            />
            <SearchUsers usersAdded={usersAdded} setUsersAdded={setUsersAdded} handleInputChange={handleInputChange} formInputs={formInputs}/>
            <button onClick={handleSubmit}>Create Group</button>
        </form>
    )
}