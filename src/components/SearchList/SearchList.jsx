import './SearchList.scss'

export default function SearchList({filteredUsers, setUsersAdded, usersAdded}) {
    const addUsers = (user) => {
        if (user.id in usersAdded){
            return;
        }
                
        let usersArray = usersAdded.users;
        usersArray.push(user)
        setUsersAdded({...usersAdded, users:usersArray, [user.id]:0})
    }

    return (
        <div className='list'>
            {filteredUsers.map((userSearched) => {
                return (
                <div className="list__item" key={userSearched.id} onClick={() => addUsers(userSearched)}>
                    <p className="list__name">{`${userSearched.firstName} ${userSearched.lastName}`}</p>
                    <p className="list__email">{userSearched.email}</p>
                </div>)
            })}
        </div>
    )
}