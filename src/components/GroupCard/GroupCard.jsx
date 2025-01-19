import axios from "axios";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import './GroupCard.scss'
import DeleteIcon from '../../assets/images/delete.svg'


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
        <div className="group-card">
            <NavLink to={`/calendar/${group.id}`}>
                <p>{group.name}</p>
            </NavLink>
            <img className="group-card__delete" onClick={deleteGroup} src={DeleteIcon} alt="Delete Icon"/>
        </div>
    )
}

export default GroupCard;