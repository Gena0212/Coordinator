import { useState } from "react";
import './CreateGroupModal.scss';
import CreateGroupForm from "../CreateGroupForm/CreateGroupForm";


function CreateGroupModal(){

    return(
        <section className="modal">
            <h2>Create a New Group</h2>
            <CreateGroupForm/>
        </section>
    )
}

export default CreateGroupModal;