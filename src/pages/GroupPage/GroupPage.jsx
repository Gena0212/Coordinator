import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from '../../components/Calendar/Calendar';
import GroupsBar from "../../components/GroupsBar/GroupsBar";
import './GroupPage.scss'
import Header from "../../components/Header/Header";

function GroupPage({ groups, setIsModalOpen, fetchGroups}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [groupData, setGroupData] = useState([])

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
            setGroupData(response.data);
            setIsLoggedIn(true);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            if (error.status === 401) {
                setIsLoading(false);
            }
        }
    }
    
    let events = []
    
    useEffect(() => {
        fetchGroupDetails(id);
    }, []);

    return(
        <>
        {isLoading ? 
        <h2>Loading....</h2> :
        isLoggedIn ?
            <>    
                <Header isLoggedIn={isLoggedIn}/>
                <main className="main">
                    <GroupsBar groups={groups} setIsModalOpen={setIsModalOpen} fetchGroups={fetchGroups}/>
                    <section className="calendar">
                        <h1>Group Page</h1>
                        <Calendar groupData={groupData}/>
                    </section>
                </main>
            </>
        : <p>You must be logged in to see this page</p>
        }
        </>
        
    )
}

export default GroupPage;