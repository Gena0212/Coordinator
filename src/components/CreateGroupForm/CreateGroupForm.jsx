import { useState } from "react";
import SearchUsers from "../SearchUsers/SearchUsers";
import axios from "axios";
import './CreateGroupForm.scss';
 
export default function CreateGroupForm({fetchGroups, closeModal}){
    const [usersAdded, setUsersAdded] = useState({users: []})
    const [formInputs, setFormInputs] = useState({
        groupName: "",
        searchField: "",
      });

      const [errMessage, setErrMessage] = useState('')
      
      const authToken = localStorage.getItem('authToken');


    const handleInputChange = (e) => {
        setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
        setErrMessage('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(formInputs.groupName.replaceAll(" ", "") === ''){
            setErrMessage('Please enter a name for your group')
            return;
        }

        if (usersAdded.users.length === 0){
            setErrMessage('Please add users to your group')
            return;
        }

        

        let memberObj = JSON.parse(JSON.stringify(usersAdded))
        delete memberObj.users;
        console.log(memberObj);

        const groupData = {
            groupName: formInputs.groupName, 
            members: memberObj
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
                closeModal()
            }

        } catch (error) {
            console.log(error)
        }
    }


    return(
        <form className="create-form">
            
                <div className="create-form__group">
                    <label htmlFor="groupName" className="create-form__label">Group Name:</label>
                    <input
                    type="text"
                    name="groupName"
                    value={formInputs.groupName}
                    onChange={handleInputChange}
                    placeholder="Your Group Name"
                    className="create-form__input"
                    />
                </div>
                <SearchUsers usersAdded={usersAdded} setUsersAdded={setUsersAdded} handleInputChange={handleInputChange} formInputs={formInputs} handleSubmit={handleSubmit} errMessage={errMessage} />            
        </form>
    )
}