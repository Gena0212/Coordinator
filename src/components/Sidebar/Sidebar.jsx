function Sidebar({setIsModalOpen}){
    
    const openModal = () => {
        setIsModalOpen(true)
    }

    return(
        <>
            <h2>Your Groups</h2>
            <button onClick={openModal}>Create a group</button>
        </>
    )
}

export default Sidebar;