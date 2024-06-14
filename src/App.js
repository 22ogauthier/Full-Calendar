import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import Modal from './Modal'
import Form from './Form'




export default function App() {
  //STATE VARIABLES
  const [currentEvents, setCurrentEvents] = useState([]) //not sure what currentEvents does but if I take it away, it breaks
  const [modalOpen, setModalOpen] = useState(false) //controls whether the event info modal is displayed
  const [formOpen, setFormOpen] = useState(false) //controls whether the event form modal is displayed
  const [selectedEvent, setSelectedEvent] = useState(null) //sets the selected event
  const [selectedStartDate, setSelectedStartDate] = useState(null) //sets the selected start date
  const [selectedEndDate, setSelectedEndDate] = useState(null) //sets the selected end date


  //handles storing the events in localStorage
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });


  //synchronizes events array wtih the local storage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);


  //function to add an event to the events array and display it on the calendar view
  //not sure how it actually adds to the display but I assume that is handled on Full Calendar's side
  // const addEvent = (newEvent) => {
  //   setEvents([...events, newEvent]);
  // };


  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...events, newEvent]);
  };


  //function to remove an event from the events array, and thus the calendar view by accessing the event through its id
  // const removeEvent = (id) => {
  //   const updatedEvents = events.filter((event) => event.id !== id);
  //   setEvents(updatedEvents);
  // }
  const removeEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
  };


  //function that is called when a user clicks on a date
  function handleDateSelect(selectInfo) {
    setFormOpen(true);  //opens the modal form to input date information
    setSelectedEvent(null);  //sets selectedEvent to null because no event is selected
    setSelectedStartDate(selectInfo.startStr);  //sets selectedStartDate to the date the user selected
    setSelectedEndDate(selectInfo.endStr); //sets selectedEndDate to the date after the date the user selected
  }


  //function that is called when a user clicks on an event
  function handleEventClick(clickInfo) {
    setSelectedEvent(clickInfo.event); //sets the selectedEvent to the clicked event
    setSelectedStartDate(clickInfo.event.startStr);
    setModalOpen(true); //displays the event info modal
  }


  //not quite sure what this does
  function handleEvents(events) {
    setCurrentEvents(events)
  }


  //function that is called when the event form is submitted
  function onSubmit(event) {
    event.preventDefault();


    //takes the data submitted during the form and turns it into a formData object with the key being the input field's name and the value being what the user inputted
    const myFormData = new FormData(event.target);
    const formDataObj = {};
    myFormData.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj); //prints out formDataObj for testing


    removeEvent(selectedEvent?.id)


    //creates the new event
    const newEvent = {
      id: createEventId(),
      title: myFormData.get('title'),
      start: myFormData.get('dateS'),
      end: myFormData.get('dateS'),
      groupId: "",
      daysOfWeek: "",
      startRecur: "",
      endRecur: "",
      allDay: "",
      groupId: "",
      startTime: "",
      endTime: "",
      extendedProps: {
        notes: myFormData.get('notes'),
        location: myFormData.get('location'),
        recurring: "",
        recurDays: "",
        formatRecurStart: "",
        formatRecurEnd: "",
        multipleDays: "",
        multiEnd: ""
      }
    };

    //creates a groupID for recurrsing events
    if (myFormData.get('recurring') == "on") {
      newEvent.groupId = createEventId();
      newEvent.startRecur = myFormData.get('startRec');
      newEvent.startTime = myFormData.get('start');
      newEvent.endTime = myFormData.get('end');
      newEvent.extendedProps.formatRecurStart = myFormData.get('startRec');
      newEvent.extendedProps.recurring = true;
      let days = [];
      let recurDays = [];
      if (myFormData.get('Sunday') == "Sunday") {
        days = [...days, '0'];
        recurDays = [...recurDays, "Sunday"];
      }
      if (myFormData.get('Monday') == "Monday") {
        days = [...days, '1'];
        recurDays = [...recurDays, "Monday"];
      }
      if (myFormData.get('Tuesday') == "Tuesday") {
        days = [...days, '2'];
        recurDays = [...recurDays, "Tuesday"];
      }
      if (myFormData.get('Wednesday') == "Wednesday") {
        days = [...days, '3'];
        recurDays = [...recurDays, "Wednesday"];
      }
      if (myFormData.get('Thursday') == "Thursday") {
        days = [...days, '4'];
        recurDays = [...recurDays, "Thursday"];
      }
      if (myFormData.get('Friday') == "Friday") {
        days = [...days, '5'];
        recurDays = [...recurDays, "Friday"];
      }
      if (myFormData.get('Saturday') == "Saturday") {
        days = [...days, '6'];
        recurDays = [...recurDays, "Saturday"];
      }
      newEvent.daysOfWeek = days;
      newEvent.extendedProps.recurDays = recurDays;
    } else {
      newEvent.extendedProps.recurring = false;
    }


    if (myFormData.get('endRec')) {
      const eventEndRec = new Date(myFormData.get('endRec'));
      eventEndRec.setDate(eventEndRec.getDate() + 1);
      newEvent.endRecur = eventEndRec;
      var options = { year: "numeric", month: "numeric", day: "numeric" };
      newEvent.extendedProps.formatRecurEnd = formatDate(eventEndRec);
    }


    if (myFormData.get('dateE')) {
      const eventEnd = new Date(myFormData.get('dateE'));
      eventEnd.setDate(eventEnd.getDate() + 1);
      newEvent.end = formatDate(eventEnd);
    }

    if (myFormData.get('multiple') == 'on') {
      newEvent.extendedProps.multipleDays = true;

      const eventEnd = new Date(myFormData.get('dateE'));
      eventEnd.setDate(eventEnd.getDate() + 2);
      newEvent.end = formatDate(eventEnd);

      const multiEnd = new Date(myFormData.get('dateE'));
      multiEnd.setDate(multiEnd.getDate() + 2);
      newEvent.extendedProps.multiEnd = formatDate(multiEnd);
    } else {
      newEvent.extendedProps.multipleDays = false;
    }

    //if an end time is provided on the form, set the event's end time to that time and allday becomes false, otherwise, allday stays true and the end time is 11:59 PM
    if (myFormData.get('end') != "") {
      newEvent.end += ("T" + myFormData.get('end'));
    }


    //if a start time is provided on the form, set the event's start time to that time and allday becomes false, otherwise, allday stays true and the start time is 12 am
    if (myFormData.get('start') != "") {
      newEvent.start += ("T" + myFormData.get('start'));
    }

    if (myFormData.get('allday') == 'on') {
      newEvent.allDay = true;
    } else {
      newEvent.allDay = false;
    }

    console.log(newEvent) //prints out event details for testing
    addEvent(newEvent); //calls addEvent function
    console.log("Added " + newEvent.id);
    if (selectedEvent) {
      removeEvent(selectedEvent.id)
    }
    //console.log("Removed " + selectedEvent.id);
    //setSelectedEvent(null);
    setFormOpen(false); //closes modal form
  }


  function formatDate(dateString) {
    const date = new Date(dateString);


    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');


    return `${year}-${month}-${day}`;
  }


  //returns calendar rendering
  return (
    <div className='demo-app-main'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        //weekends={weekendsVisible}
        events={events} // alternatively, use the `events` setting to fetch from a feed
        //dateClick={handleDateSelect}
        select={handleDateSelect}
        //eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents}
        defaultTimedEventDuration="01:00:00"
        forceEventDuration={true}
      // called after events are initialized/added/changed/removed
      /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      */
      />
      {modalOpen && <Modal setOpenModal={setModalOpen} event={selectedEvent} removeEvent={removeEvent} setOpenForm={setFormOpen} />}
      {formOpen && <Form setOpenForm={setFormOpen} startDate={selectedStartDate} endDate={selectedEndDate} onSubmit={onSubmit} event={selectedEvent} />}
    </div>
  )
}


//provided with Full Calendar, not used currently
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

