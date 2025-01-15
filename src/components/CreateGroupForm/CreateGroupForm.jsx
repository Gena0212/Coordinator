import SearchUsers from "../SearchUsers/SearchUsers";

export default function CreateGroupForm(){
    return(
        <form>
            <label htmlFor="groupName">Name For Your Group:</label>
            <input
            type="text"
            name="groupName"
            value={groupName}
            onChange={handleInputChange}
            />
            <SearchUsers usersAdded={usersAdded} setUsersAdded={setUsersAdded}/>
            <button>Create Group</button>
        </form>
    )
}