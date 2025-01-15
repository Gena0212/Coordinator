import { useState } from "react";
import SearchUsers from "../SearchUsers/SearchUsers";
 
export default function CreateGroupForm(){
    const [usersAdded, setUsersAdded] = useState({})
    const [formInputs, setFormInputs] = useState({
        groupName: "",
        searchField: "",
      });

    const handleInputChange = (e) => {
        setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const groupData = {
            groupName: formInputs.groupName, 
            member_ids: usersAdded
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/group`, groupData);
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