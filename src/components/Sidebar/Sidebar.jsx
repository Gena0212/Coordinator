import { useEffect, useState } from 'react';
import './Sidebar.scss';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import GroupCard from '../GroupCard/GroupCard'
import Button from '../Button/Button';

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
            <Button onClick={openModal}>Add Group</Button>
            {groups.map((group) => {
                    return <GroupCard key={group.id} group={group} fetchGroups={fetchGroups}/>
            })}
        </section>
        
    )
}

export default Sidebar;