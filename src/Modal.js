import React from "react";
import "./Modal.css";
import { BsFillTrash3Fill, BsFillPencilFill, BsBoxArrowRight, BsCalendarEventFill, BsGeoAltFill, BsStickyFill } from "react-icons/bs";




/*
setOpenModal: controls if the event info modal is displayed
    true: displayed, false: hidden
event: the selectedEvent passed in from App.js
    selectedEvent's values comes from clicking on an event
removeEvent: function passed in from App.js
    removes selectedEvent from local storage and calendar view
setOpenForm: controls if the form info modal is displayed
    true: displayed, false: hidden
*/


function Modal({ setOpenModal, event, removeEvent, setOpenForm }) {
    const dateOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };


    const dateOptions2 = {
        month: 'long',
        day: 'numeric'
    };


    const timeOptions = {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    };


    // const multipleDays = event?.end.toLocaleDateString() != event?.start.toLocaleDateString() && !event?.allDay ? true : false;


    function formatDate() {
        let date = "";
        date += event?.start?.toLocaleDateString('en-US', dateOptions);
        if (event?.extendedProps.multipleDays && event?.extendedProps.multiEnd != "") {
            date += " until " + new Date(event?.extendedProps.multiEnd).toLocaleDateString('en-US', dateOptions) + "\n";
        }
        return date;
    }

    function formatTime() {
        let date = "";
        if (!event?.allDay) {
            date += event?.start?.toLocaleTimeString('en-US', timeOptions) + " - " + (event?.end?.toLocaleTimeString() ? event?.end?.toLocaleTimeString('en-US', timeOptions) : "11:59 PM");
        }
        return date;
    }


    function formatRecurDate() {
        let date = "";
        if (event?.extendedProps.recurring) {
            date = "Recurring every ";
            for (let i = 0; i < event.extendedProps.recurDays.length; i++) {
                date += event.extendedProps.recurDays[i] + ", ";
            }
            if (event?.extendedProps.formatRecurStart != "") {
                date += " from " + new Date(event?.extendedProps.formatRecurStart).toLocaleDateString('en-US', dateOptions2);
            }
            if (event?.extendedProps.formatRecurEnd != "") {
                date += " until " + new Date(event?.extendedProps.formatRecurEnd).toLocaleDateString('en-US', dateOptions2);
            }
        }
        return date;
    }


    const hasLocation = event?.extendedProps.location ? true : false;
    const hasNotes = event?.extendedProps.notes ? true : false;


    return (
        <div className="modal-overlay">
            <div id="modal">
                <div id="modal-header">
                    <div id="changes">
                        <div id="trash" class="header-icon" onClick={() => {
                            removeEvent(event?.id);
                            setOpenModal(false);
                        }}>
                            <BsFillTrash3Fill />
                        </div>
                        <div id="edit" class="header-icon" onClick={() => {
                            setOpenForm(true);
                            setOpenModal(false);
                        }}>
                            <BsFillPencilFill />
                        </div>
                        <div id="close" class="header-icon" onClick={() => {
                            setOpenModal(false);
                        }}>
                            <BsBoxArrowRight />
                        </div>
                    </div>
                </div>
                <div id="content">
                    <div id="modal-title">
                        <h1>{event?.title}</h1>
                    </div>
                    <div id="event-info">
                        <div id="date" class="info">
                            <div id="date-icon" class="icon">
                                <BsCalendarEventFill />
                            </div>
                            <div id="date-text" class="text">
                                <h2 id="formatDate">{formatDate()}</h2>
                                <h2 id="formatTime">{formatTime()}</h2>
                                <h3 id="formatRecurDate">{formatRecurDate()}</h3>
                            </div>
                        </div>
                        {hasLocation && (
                            <div id="location" class="info">
                                <div id="location-icon" class="icon">
                                    <BsGeoAltFill />
                                </div>
                                <div id="location-text" class="text">
                                    <h3>{event?.extendedProps.location}</h3>
                                </div>
                            </div>
                        )}
                        {hasNotes && (
                            <div id="notes" class="info">
                                <div id="notes-icon" class="icon">
                                    <BsStickyFill />
                                </div>
                                <div id="notes-text" class="text">
                                    <h3>{event?.extendedProps.notes}</h3>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div id="modal-footer"></div>
            </div>
        </div>
    )
}


export default Modal;









