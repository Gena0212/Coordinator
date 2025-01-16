import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function GroupPage(){

    const { id }= useParams();
    const authToken = localStorage.getItem('authToken');

    const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

    const fetchGroupDetails = async (id) => {
        try {
            const response = await axios.get(`${apiBaseURL}/groups/${id}/members`, 
                {
                    headers: {
                      authorisation: `Bearer ${authToken}`,
                    },
                }
            )
            console.log(response.data);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGroupDetails(id);
    }, []);

    return(
        <h1>Group Page</h1>
    )
}

export default GroupPage;