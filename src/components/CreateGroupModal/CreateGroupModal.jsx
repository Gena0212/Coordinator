import { useState } from "react";
import './CreateGroupModal.scss';
import CreateGroupForm from "../CreateGroupForm/CreateGroupForm";


function CreateGroupModal({fetchGroups}){

    return(
        <section className="modal">
            <h2 className="modal__title">Create Your Group</h2>
            <CreateGroupForm fetchGroups={fetchGroups}/>
        </section>
    )
}

export default CreateGroupModal;