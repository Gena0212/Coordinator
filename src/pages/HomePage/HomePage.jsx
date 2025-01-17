import { useEffect, useState } from 'react';
import './HomePage.scss';
import axios from "axios";
import Sidebar from '../../components/Sidebar/Sidebar';
import CreateGroupModal from '../../components/CreateGroupModal/CreateGroupModal';
import { Calendar } from '@fullcalendar/core/index.js';
import LoginForm from '../../components/LoginForm/LoginForm';
import Invite from '../../components/Invite/Invite';
// import { JWT } from 'google-auth-library';


function HomePage(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invites, setInvites] = useState([]);
    
    const apiURL = import.meta.env.VITE_API_BASE_URL


    useEffect(()=>{
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

    console.log(invites)

    return (
        <main className='home'>
            <Sidebar setIsModalOpen={setIsModalOpen}/>
            <section>
                {isModalOpen && <CreateGroupModal/>}
                <h1>Welcome Home!</h1>
                {invites.map((invite) => {
                    return <Invite key={invite.id} groupInfo={invite}/>
                })}
            </section>
        </main>

    )
}

export default HomePage;