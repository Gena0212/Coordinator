import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

export default function WeekCalendar(){
    return (
        <div>
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView='timeGridWeek'
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            }}
            />
        </div>
        
    )
}