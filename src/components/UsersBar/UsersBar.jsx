import { useEffect, useState } from "react"
import './UsersBar.scss'

export default function UsersBar({groupData, setGroupData }) {

    useEffect(() => {
        let tempGroupData = []
        for (let i = 0; i < groupData.length; i ++) {
            let member = groupData[i] //member is an object

            let tempObj = JSON.parse(JSON.stringify(member))
            tempObj['isChecked'] = true;

            tempGroupData.push(tempObj);
        }

        setGroupData(tempGroupData);
        // let tempObj = {}
        // for (let i = 0; i < groupData.length; i ++){
        //     tempObj[groupData[i].id] = true
        // }
        // setIsChecked(tempObj)
     }, [])

    const handleChange = (member) => {
        let tempGroupData = []
        for (let i = 0; i < groupData.length; i ++) {
            let tempObj = JSON.parse(JSON.stringify(groupData[i]))

            console.log(tempObj)
            console.log(member.isChecked)
            if (tempObj.id === member.id){
                tempObj['isChecked'] = !member.isChecked;
            }
            tempGroupData.push(tempObj);
            setGroupData(tempGroupData)
        }
        // let newObj = JSON.parse(JSON.stringify(isChecked));
        // newObj[member.id] =  !isChecked[member.id];       
        // setIsChecked(newObj);
    };
    console.log(groupData);

    return(
        <section className="users-bar">
            <h3 className="users-bar__header">Group Members:</h3>
            <section className="users-bar__users">
                {groupData.map((member) => {
                        return (
                            <>
                            {
                                member.accept_invite === 1 ?
                                <div key={member.id} className="users-bar__user">
                                    <p className="users-bar__name">{`${member.firstName} ${member.lastName}`}</p>
                                    <input 
                                        type="checkbox"
                                        checked={member.isChecked}
                                        onChange={() => handleChange(member)}
                                    />
                                </div> :
                                <div key={member.id} className="users-bar__user users-bar__user--inactive">
                                    <p className="users-bar__name">{`${member.firstName} ${member.lastName}`}</p>
                                </div>
                            }
                            </>
                        )
                })}
            </section>
        </section>
    )
}