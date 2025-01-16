import './Sidebar.scss';


function Sidebar({setIsModalOpen}){
    
    const openModal = () => {
        setIsModalOpen(true)
    }

    return(
        <section>
            <h2>Your Groups</h2>
            <button onClick={openModal}>Create a group</button>
        </section>
        
    )
}

export default Sidebar;