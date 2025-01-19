import './AddedUsers.scss'
import CrossIcon from '../../assets/images/x.svg'

export default function AddedUsers({usersAdded, setUsersAdded}) {

    const removeUser = (user) => {
        console.log('enter into remove user', user)
        let newUsersAdded = JSON.parse(JSON.stringify(usersAdded));

        let usersArray = usersAdded.users

        for(let i = 0; i < usersArray.length; i ++){
            if (user.id === usersArray[i].id){
                usersArray.splice(i, 1)
                delete newUsersAdded[user.id]
            }
        }

        setUsersAdded({... newUsersAdded, users:usersArray})
    }

    return(
        <div className='added'>
            {usersAdded.users.map((user) => {
                return (
                    <div className='added__user'>
                        <div className="added__details">
                            <p className="added__name">{`${user.firstName} ${user.lastName}`}</p>
                            <p className="added__email">{user.email}</p>
                        </div>
                        <img onClick={() => removeUser(user)} className='added__icon' src={CrossIcon} alt="Cross Icon"/>
                    </div>

                )
            })}
        </div>
    )
}