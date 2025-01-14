import { useEffect, useState } from 'react';
import './HomePage.scss';
import axios from "axios";
import Sidebar from '../../components/Sidebar/Sidebar';
import CreateGroupModal from '../../components/CreateGroupModal/CreateGroupModal';
import { Calendar } from '@fullcalendar/core/index.js';
import LoginForm from '../../components/LoginForm/LoginForm';
// import { JWT } from 'google-auth-library';


function HomePage(){
    const [events, setEvents] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const apiURL = import.meta.env.VITE_API_BASE_URL


    useEffect(()=>{
        const authToken = localStorage.getItem('authToken');
        console.log(authToken);
        const getEvents = async () => {
            try {   
                const response = await axios.get(`${apiURL}/oauth/events`,
                    {
                        headers: {
                          authorisation: `Bearer ${authToken}`,
                        },
                    }
                )
                console.log(response)
                setEvents(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getEvents();
    }, [])

    console.log(isModalOpen);

    return (
        <main className='home'>
            {isModalOpen && <CreateGroupModal/>}
            <h1>Welcome Home!</h1>
            <Sidebar setIsModalOpen={setIsModalOpen}/>
        </main>

    )
}

export default HomePage;