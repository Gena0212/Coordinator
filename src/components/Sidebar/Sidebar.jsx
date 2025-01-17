import { useEffect, useState } from 'react';
import './Sidebar.scss';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import GroupCard from '../GroupCard/GroupCard'

function Sidebar({setIsModalOpen}){
    const [groups, setGroups] = useState([]);

    const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        console.log('enter use effect')

        const authToken = localStorage.getItem('authToken');

        const fetchGroups = async () => {
            console.log('enter fetchGroups')
            try {
                const response = await axios.get(`${apiBaseURL}/groups`, 
                    {
                        headers: {
                          authorisation: `Bearer ${authToken}`,
                        },
                    }
                )
                setGroups(response.data);

            } catch (error) {
                console.log(error)
            }
        }

        fetchGroups();
    }, [])
    
    const openModal = () => {
        setIsModalOpen(true)
    }   

    return(
        <section>
            <h2>Your Groups</h2>
            <button onClick={openModal}>Create a group</button>
            <ul>
                {groups.map((group) => {
                    return <GroupCard key={group.id} group={group}/>
                })}
            </ul>
        </section>
        
    )
}

export default Sidebar;