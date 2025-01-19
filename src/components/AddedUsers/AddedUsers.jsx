import './AddedUsers.scss'
import CrossIcon from '../../assets/images/x.svg'

export default function AddedUsers({usersAdded}) {
    return(
        <div className='added'>
            {usersAdded.users.map((user) => {
                return (
                    <div className='added__user'>
                        <div className="added__details">
                            <p className="added__name">{`${user.firstName} ${user.lastName}`}</p>
                            <p className="added__email">{user.email}</p>
                        </div>
                        <img className='added__icon' src={CrossIcon} alt="Cross Icon"/>
                    </div>

                )
            })}
        </div>
    )
}