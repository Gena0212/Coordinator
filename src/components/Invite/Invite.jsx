function Invite({groupInfo}){
    const members = groupInfo.members
    console.log(members)

    return(
        <section>
            <h3>{groupInfo.name}</h3>
            {members.map((member) => {
                return (
                    <>
                        <p>{member.firstName}</p>
                    </>
                )
            })}
        </section>
    )
}

export default Invite;