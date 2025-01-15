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
            <button>Create Group</button>
        </form>
    )
}