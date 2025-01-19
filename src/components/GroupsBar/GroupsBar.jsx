import { useEffect, useState } from 'react';
import './GroupsBar.scss';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import GroupCard from '../GroupCard/GroupCard'
import Button from '../Button/Button';

function GroupsBar({groups, setIsModalOpen, fetchGroups}){

    useEffect(() => {
        fetchGroups();
    }, [])
    
    const openModal = () => {
        setIsModalOpen(true)
    }   

    return(
        <section className='groups'>
            <section className='groups__header'>
                <h2 className='groups__title'>Your Groups:</h2>
                <Button onClick={openModal} className='button--add'>Add New Group</Button>
            </section>
            <section className='groups__items'>
                {groups.map((group) => {
                        return <GroupCard key={group.id} group={group} fetchGroups={fetchGroups}/>
                })}
            </section>
        </section>
        
    )
}

export default GroupsBar;