import { useEffect, useState } from 'react';
import './HomePage.scss';
import axios from "axios";
import Sidebar from '../../components/Sidebar/Sidebar';
import CreateGroupModal from '../../components/CreateGroupModal/CreateGroupModal';
import LoginForm from '../../components/LoginForm/LoginForm';
import Invite from '../../components/Invite/Invite';
import Header from '../../components/Header/Header';
// import { JWT } from 'google-auth-library';


function HomePage({groups, fetchGroups, isModalOpen, setIsModalOpen}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(false);
            setIsLoggedIn(true);
        } catch (error) {
            console.log(error);
            if (error.status === 401) {
                setIsLoading(false);
            }
        }
    }
    
    const updateEvents = async () => {
        try {   
            const response = await axios.get(`${apiURL}/oauth/events`,
                {
                    headers: {
                      authorisation: `Bearer ${authToken}`,
                    },
                }
            )
            setIsLoading(false);
            setIsLoggedIn(true)
        } catch (error) {
            console.error(error);
            if (error.status === 401) {
                setIsLoading(false);
            }
        }
    }

    useEffect(()=>{
        updateEvents();
        getInvites();
    }, [])


    return (
        <>
        {isLoading && <h2>Loading....</h2>}
        {!isLoading && isLoggedIn ? 
            <section className='home'>
                <Header isLoggedIn={isLoggedIn}/>
                {isModalOpen && <CreateGroupModal fetchGroups={fetchGroups} setIsModalOpen={setIsModalOpen}/>}
                <main className='home__main'>
                    <Sidebar groups={groups} setIsModalOpen={setIsModalOpen} fetchGroups={fetchGroups}/>
                    <section>
                        <h1>Welcome Home!</h1>
                        {invites.map((invite) => {
                            return <Invite key={invite.id} groupInfo={invite} getInvites={getInvites}/>
                        })}
                    </section>
                </main>
            </section>
        : <p>You must be logged in to see this page</p>
            
        }
        </> 
    )
}

export default HomePage;