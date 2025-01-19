import './AddedUsers.scss'

export default function AddedUsers({usersAdded}) {
    return(
        <div className='added'>
            {usersAdded.users.map((user) => {
                return (
                    <div className="added__user">
                        <p className="added__name">{`${user.firstName} ${user.lastName}`}</p>
                        <p className="added__email">{user.email}</p>
                    </div>
                )
            })}
        </div>
    )
}