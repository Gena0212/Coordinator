import axios from "axios";
import { NavLink } from "react-router-dom";

function GroupCard({group, fetchGroups}) {
    const apiURL = import.meta.env.VITE_API_BASE_URL
    const authToken = localStorage.getItem('authToken');

    const deleteGroup = async () => {
        try {
            const response = await axios.delete(`${apiURL}/groups/${group.id}`, 
                {
                    headers: {
                      authorisation: `Bearer ${authToken}`,
                    },
                }
            )
            if (response.status === 204 ){
                fetchGroups();
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <NavLink to={`/calendar/${group.id}`}>
                <p>{group.name}</p>
            </NavLink>
            <button onClick={deleteGroup}>Delete Group</button>
        </>
        
       
    )
}

export default GroupCard;