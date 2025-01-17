import { useEffect, useState } from 'react';
import './HomePage.scss';
import axios from "axios";
import Sidebar from '../../components/Sidebar/Sidebar';
import CreateGroupModal from '../../components/CreateGroupModal/CreateGroupModal';
import LoginForm from '../../components/LoginForm/LoginForm';
import Invite from '../../components/Invite/Invite';
import Header from '../../components/Header/Header';
// import { JWT } from 'google-auth-library';


function HomePage({groups, setGroups, fetchGroups, isModalOpen, setIsModalOpen}){
    const [invites, setInvites] = useState([]);
    
    const apiURL = import.meta.env.VITE_API_BASE_URL

    const authToken = localStorage.getItem('authToken');


    const getInvites = async () => {
        try {
            const response = await axios.get(`${apiURL}/groups/invites`,
                {
                    headers: {
                      authorisation: `Bearer ${authToken}`,
                    },
                }
            )

            setInvites(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        
        const updateEvents = async () => {
            try {   
                const response = await axios.get(`${apiURL}/oauth/events`,
                    {
                        headers: {
                          authorisation: `Bearer ${authToken}`,
                        },
                    }
                )
                
            } catch (error) {
                console.error(error);
            }
        }

        updateEvents();
        getInvites();
    }, [])


    return (
        <>
            <Header/>
            <main className='home'>
                <Sidebar groups={groups} setIsModalOpen={setIsModalOpen} fetchGroups={fetchGroups}/>
                <section>
                    {isModalOpen && <CreateGroupModal fetchGroups={fetchGroups}/>}
                    <h1>Welcome Home!</h1>
                    {invites.map((invite) => {
                        return <Invite key={invite.id} groupInfo={invite} getInvites={getInvites}/>
                    })}
                </section>
            </main>
        </>

    )
}

export default HomePage;