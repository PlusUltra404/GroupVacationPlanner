import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick


export default function Calender(props) {

 /* const [month, setMonth] = useState(0);

  const handleSubmit = (event) => {
    props.apiservice.login(username, password).then(() => {
      navigate({
        pathname: "/home",
      });
    });

     events={[
    { title: 'event 1', date: '2019-04-01' },
    { title: 'event 2', date: '2019-04-02' }
]}
  
    render() {
      datesSet={(dateInfo) => {
        console.log(dateInfo.start) //start of the range the calendar date
        console.log(dateInfo.end) //end of the range the calendar date
    }}*/
      
        return (
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin  ]}
          initialView="dayGridMonth"
          weekends={false}
          selectable={true}
   
        />
      )
    }
  