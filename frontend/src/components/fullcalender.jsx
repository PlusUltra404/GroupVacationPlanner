import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import CalenderModal from "./CalenderModal";


export default function Calender(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const [dummy, setDummy] = useState([]);

  var list= [] ;
  useEffect(() => {
    props.apiservice.get_event().then((result) => {
      console.log(result.data);
      var list = result.data;
      setDummy(list);
    /*  console.log(result.data[0]['title'])
      console.log(result.data[0]['date'])
      for(let i=0; i <result.data.length; i++){
        console.log(i)
        const titleT = result['data'][i]['title'];
        const dateT = result['data'][i]['date'];
        list.push({titleT,dateT});
        console.log(titleT);
        console.log(dateT);
        console.log(list);
       
        
 
        
      }
      */
      console.log(dummy); 
    //  setEvents(result.data)

    });
 
  }, []);



  function renderEventContent(eventInfo) {

    return (

      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  
 

      
        return (
          <div className="Calender">
        
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin  ]}
          initialView="dayGridMonth"
          weekends={true}
          events= {dummy}
         // eventContent={renderEventContent}
          selectable={true}
          headerToolbar= {
            
            {
              left: 'prev,next today', 
              center: 'title', 
              right: 'dayGridMonth'
            }
          }
          dateClick={ function(info) {
            setdate(info.dateStr);
          }
        }
          select= { 
            
           function(info) {
             
            setModalVisible(true)
            //alert('selected ' + info.startStr + ' to ' + info.endStr);
            }
          }

        />
        
        {modalVisible && <CalenderModal setModalVisible={setModalVisible} modalVisible={modalVisible} apiservice={props.apiservice} date={date} username={props.username}/>}
        </div>
        )
    }
  