import { useEffect, useState } from 'react';
import './Sidebar.scss';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import GroupCard from '../GroupCard/GroupCard'

function Sidebar({groups, setIsModalOpen, fetchGroups}){

    useEffect(() => {
        fetchGroups();
    }, [])
    
    const openModal = () => {
        setIsModalOpen(true)
    }   

    return(
        <section>
            <h2>Your Groups</h2>
            <button onClick={openModal}>Create a group</button>
            {groups.map((group) => {
                    return <GroupCard key={group.id} group={group} fetchGroups={fetchGroups}/>
            })}
            
        </section>
        
    )
}

export default Sidebar;