import { useEffect, useState } from 'react';
import './HomePage.scss';
import axios from "axios";
import CreateGroupModal from '../../components/CreateGroupModal/CreateGroupModal';
import LoginForm from '../../components/LoginForm/LoginForm';
import Invite from '../../components/Invite/Invite';
import Header from '../../components/Header/Header';
import GroupsBar from '../../components/GroupsBar/GroupsBar'
// import GroupsBar from '../../components/Groupsbar/Groupsbar';
// import { JWT } from 'google-auth-library';


function HomePage({userData, getUserData, groups, fetchGroups, isModalOpen, setIsModalOpen}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [invites, setInvites] = useState([]);
    
    const apiURL = import.meta.env.VITE_API_BASE_URL

    const authToken = localStorage.getItem('authToken');

    console.log(userData);

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
        getUserData();
    }, [])


    return (
        <>
        {isLoading && <h2>Loading....</h2>}
        {!isLoading && isLoggedIn ? 
            <section className='home'>
                <Header isLoggedIn={isLoggedIn}/>
                {isModalOpen && <CreateGroupModal fetchGroups={fetchGroups} setIsModalOpen={setIsModalOpen}/>}
                <main className='home__main'>
                    <GroupsBar groups={groups} setIsModalOpen={setIsModalOpen} fetchGroups={fetchGroups}/>
                    <section className='home__profile'>
                        <h2 className='home__title'>{`Welcome Back, ${userData.firstName}!`}</h2>
                        {invites.length === 0 ? 
                        <h3 className='home__message'>You have no invites at the moment</h3>
                        : 
                        <section className='home__invite'>
                            {invites.map((invite) => {
                                return <Invite key={invite.id} groupInfo={invite} getInvites={getInvites} fetchGroups={fetchGroups} />
                            })}
                        </section>
                        }
                    </section>
                </main>
            </section>
        : <p>You must be logged in to see this page</p>
            
        }
        </> 
    )
}

export default HomePage;