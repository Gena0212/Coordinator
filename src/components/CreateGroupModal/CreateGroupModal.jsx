import SearchUsers from "../SearchUsers/SearchUsers";
import './CreateGroupModal.scss';


function CreateGroupModal(){
    return(
        <section className="modal">
            <h2>Create a New Group</h2>
            <SearchUsers/>
        </section>
    )
}

export default CreateGroupModal;