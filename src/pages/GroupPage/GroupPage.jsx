import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from '../../components/Calendar/Calendar';
import './GroupPage.scss'
import Header from "../../components/Header/Header";
import GroupsBar from "../../components/Groupsbar/Groupsbar";
import UsersBar from "../../components/UsersBar/UsersBar";
import { compileString } from "sass";
import CreateGroupModal from "../../components/CreateGroupModal/CreateGroupModal";

function GroupPage({ groups, isModalOpen, setIsModalOpen, fetchGroups, userData}){
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
        } catch (error) {
            console.log(error)
            if (error.status === 401) {
                setIsLoading(false);
            }
        }
    }
    
    useEffect(() => {
        fetchGroupDetails(id);
    }, []);
    
    useEffect(() => {
        if (groupData.length !== 0){
            setIsLoading(false);
        }
    }, [groupData])

    return(
        <>
        {isLoading ? 
        <h2>Loading....</h2> :
        (isLoggedIn ?
            <section className="group-page">    
                <Header isLoggedIn={isLoggedIn}/>
                {isModalOpen && <CreateGroupModal fetchGroups={fetchGroups} setIsModalOpen={setIsModalOpen}/>}
                <main className="main">
                    <GroupsBar groups={groups} setIsModalOpen={setIsModalOpen} fetchGroups={fetchGroups}/>
                    <UsersBar groupData={groupData} setGroupData={setGroupData}/>
                    <section className="main__calendar">
                        <Calendar groupData={groupData}/>
                    </section>
                </main>
            </section>
        : <p>You must be logged in to see this page</p>)
        }
        </>
        
    )
}

export default GroupPage;