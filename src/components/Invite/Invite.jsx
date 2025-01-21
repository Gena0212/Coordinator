import axios from "axios"
import Button from "../Button/Button";
import './Invite.scss'

function Invite({groupInfo, getInvites, fetchGroups}){
    const members = groupInfo.members

    const apiURL = import.meta.env.VITE_API_BASE_URL
    const authToken = localStorage.getItem('authToken');

    const acceptInvite = async () => {
        console.log('eneter into acceptInvite')
        try {
            console.log('enter into trycatch')
            const response = await axios.put(`${apiURL}/groups/invites/${groupInfo.id}`, {accept_invite: 1}, 
                {
                    headers: {
                      authorisation: `Bearer ${authToken}`,
                    },
                }
            )
            console.log('done axios request')
            console.log(response.status);
            if (response.status===200){
                fetchGroups()
                getInvites()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <section className="invite">
            <p className="invite__p">You have been invited to:</p>
            <h3 className="invite__group">{groupInfo.name}</h3>
            {members.length === 0 ?  
            <p>No other users in this group</p>:
                <section className="invite__others">
                    <p className="invite__p invite__p--bold">Other users added to this group:</p>
                    {members.map((member) => {
                        return (
                            <div className="invite__member" key={member.id}>
                                <p className="invite__name">{member.firstName} {member.lastName}</p>
                                <p className="invite__email">{member.email}</p>
                            </div>
                        )
                    })}
                </section>
            }
            <Button className='button--accept' onClick={acceptInvite}>Accept Invite</Button>
        </section>
    )
}

export default Invite;