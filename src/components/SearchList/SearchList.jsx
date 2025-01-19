import './SearchList.scss'

export default function SearchList({filteredUsers, setUsersAdded, usersAdded}) {
    return (
        <>
            {filteredUsers.map((userSearched) => {
                return (
                <div className="list" key={userSearched.id} onClick={() => setUsersAdded({...usersAdded, [userSearched.id]:0})}>
                    <p className="list__name">{`${userSearched.firstName} ${userSearched.lastName}`}</p>
                    <p className="list__email">{userSearched.email}</p>
                </div>)
            })}
        </>
    )
}