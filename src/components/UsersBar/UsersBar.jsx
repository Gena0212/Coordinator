import { useEffect, useState } from "react"
import './UsersBar.scss'

export default function UsersBar({groupData}) {
    const [isChecked, setIsChecked] = useState({})

    useEffect(() => {
        let tempObj = {}
        for (let i = 0; i < groupData.length; i ++){
            tempObj[groupData[i].id] = true
        }
        setIsChecked(tempObj)
     }, [])

    const handleChange = (member) => {
        let newObj = JSON.parse(JSON.stringify(isChecked));
        newObj[member.id] =  !isChecked[member.id];       
        setIsChecked(newObj);
    };

    return(
        <section className="users-bar">
            <h3 className="users-bar__header">Group Members:</h3>
            <section className="users-bar__users">
                {groupData.map((member) => {
                        return (
                            <div className="users-bar__user">
                                <p className="users-bar__name">{`${member.firstName} ${member.lastName}`}</p>
                                <input 
                                    type="checkbox"
                                    checked={isChecked[member.id]}
                                    onChange={() => handleChange(member)}
                                />
                            </div>
                        )
                })}
            </section>
        </section>
    )
}