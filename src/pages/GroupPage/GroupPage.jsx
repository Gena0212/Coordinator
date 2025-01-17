import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from '../../components/Calendar/Calendar';
import Sidebar from "../../components/Sidebar/Sidebar";
import './GroupPage.scss'
import Header from "../../components/Header/Header";

function GroupPage({groups, setIsModalOpen, fetchGroups}){
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
        } catch (error) {
            console.log(error)
        }
    }
    
    let events = []
    
    useEffect(() => {
        fetchGroupDetails(id);
    }, []);

    return(
        <main className="main">
            <Header/>
            <Sidebar groups={groups} setIsModalOpen={setIsModalOpen} fetchGroups={fetchGroups}/>
            <section className="calendar">
                <h1>Group Page</h1>
                <Calendar groupData={groupData}/>
            </section>
        </main>
        
    )
}

export default GroupPage;