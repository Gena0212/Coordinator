import { NavLink } from "react-router-dom";

function GroupCard({group}) {
    return(
        
        <li key={group.id}>
            <NavLink to={`/calendar/${group.id}`}>{group.name}</NavLink>
        </li>
    )
}

export default GroupCard;