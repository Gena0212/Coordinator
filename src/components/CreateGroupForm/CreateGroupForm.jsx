import { useState } from "react";
import SearchUsers from "../SearchUsers/SearchUsers";
import axios from "axios";
import { constrainPoint } from "@fullcalendar/core/internal";
import Button from "../Button/Button";
 
export default function CreateGroupForm({fetchGroups}){
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
            if(res.status===201){
                fetchGroups()
            }

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
            <Button onClick={handleSubmit}>Create Group</Button>
        </form>
    )
}