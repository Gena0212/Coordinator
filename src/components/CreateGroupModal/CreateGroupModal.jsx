import { useState } from "react";
import './CreateGroupModal.scss';
import CreateGroupForm from "../CreateGroupForm/CreateGroupForm";
import CrossIcon from '../../assets/images/x.svg'



function CreateGroupModal({fetchGroups, setIsModalOpen}){
    const closeModal = () => {
        setIsModalOpen(false)
    }  

    return(
        <section className="modal">
             <img  onClick={closeModal} className='modal__icon' src={CrossIcon} alt="Cross Icon"/>
            
            <h2 className="modal__title">Create Your Group</h2>
            <CreateGroupForm fetchGroups={fetchGroups} closeModal={closeModal}/>
        </section>
    )
}

export default CreateGroupModal;