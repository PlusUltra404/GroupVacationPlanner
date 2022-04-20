import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import CalenderModal from "./CalenderModal";


export default function Calender(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  /* const handleClick = (event) => {
    props.apiservice.save_event(props.username, title, date);
    // Prevent page reload
    
  };
*/
  const onEventAdded = (event) => {
    setEvents([...events, event]);
  };

      
        return (
          <div className="Calender">
        
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin  ]}
          initialView="dayGridMonth"
          weekends={true}
        //  events={[
          //  { title: 'event 1', date: '2022-04-10' },
           // { title: 'event 2', date: '2022-04-12' }
         // ]}
          eventContent={renderEventContent}
          selectable={true}
          headerToolbar= {
            
            {
              left: 'prev,next today', 
              center: 'title', 
              right: 'dayGridMonth'
            }
          }
           
          select= { 
            
           function(info) {
            setModalVisible(true)
            //alert('selected ' + info.startStr + ' to ' + info.endStr);
            }
          }

        />
        
        {modalVisible && <CalenderModal setModalVisible={setModalVisible} modalVisible={modalVisible} apiservice={props.apiservice} />}
        </div>
        )
    }
  