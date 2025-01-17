import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

function Calendar(){
    return (
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView='timeGridWeek'
        headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
        }}
        />
        
    )
}

export default Calendar;