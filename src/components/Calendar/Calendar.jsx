import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from "react";
import './Calendar.scss'

function Calendar({groupData}){

    const [eventsToRender, setEventsToRender] =  useState([])

    useEffect(() => {
        let tempEventArray = []
        
        if (groupData.length !== 0){
            for (let i = 0; i < groupData.length; i ++){
                const member = groupData[i];
                for (let j = 0; j < member.events.length; j ++){
                    const event = member.events[j];
                    let newObj = {}
                    newObj['start'] = event.start.dateTime || event.start.date
                    newObj['end'] = event.end.dateTime || event.end.date
                    tempEventArray.push(newObj);
                }
            }
        }
        
        setEventsToRender(tempEventArray)

    }, [groupData])


    return (
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView='timeGridWeek'
        headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
        }}
        events={eventsToRender}
        />
        
    )
}

export default Calendar;