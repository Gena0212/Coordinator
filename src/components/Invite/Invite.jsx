import axios from "axios"

function Invite({groupInfo}){
    const members = groupInfo.members

    const apiURL = import.meta.env.VITE_API_BASE_URL
    const authToken = localStorage.getItem('authToken');

    const acceptInvite = async () => {
        try {
            const response = await axios.put( `${apiURL}/groups/invites/${groupInfo.id}`, {accept_invite: 1}, 
                {
                    headers: {
                      authorisation: `Bearer ${authToken}`,
                    },
                }
            )
            console.log(response.status)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <section>
            <h3>{groupInfo.name}</h3>
            {members.map((member) => {
                return (
                    <div key={member.id}>
                        <p>{member.firstName} {member.lastName}</p>
                        <p>{member.email}</p>
                    </div>
                    
                )
            })}
            <button onClick={acceptInvite}>Accept Invite</button>
        </section>
    )
}

export default Invite;