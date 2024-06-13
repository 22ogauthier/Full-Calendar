import React, { useState, useEffect } from 'react';
import { formatDate } from '@fullcalendar/core'
import ReactDOM from 'react-dom/client';
import './Form.css'
import { BsFillTrash3Fill, BsFillPencilFill, BsBoxArrowRight, BsCalendarEventFill, BsGeoAltFill, BsStickyFill } from "react-icons/bs";




/*
setOpenForm: controls if the form modal is displayed
    true: displayed, false: hidden
startDate: the selectedStartDate passed in from App.js
    selectedStartDate's value comes from clicking on a date
endDate: the selectedEndDate passed in from App.js
    selectedEndDate's value comes from clicking on a date
onSubmit: calls the onSubmit function in App.js
    handles creating the actual event and displaying it on the calendar
event: the selectedEvent passed in from App.js
    selectedEvent's values comes from clicking on an event
*/
function Form({ setOpenForm, startDate, endDate, onSubmit, event }) {


    //if extendedForm is true, shows more options for recurring events
    const [extendedForm, setExtendedForm] = useState(false);
    const [multipleDates, setMultipleDates] = useState(false);
    const [recChecked, setRecChecked] = useState(false);
    const [allDayChecked, setAllDayChecked] = useState(false);
    const [sundayChecked, setSundayChecked] = useState(false);
    const [mondayChecked, setMondayChecked] = useState(false);
    const [tuesdayChecked, setTuesdayChecked] = useState(false);
    const [wednesdayChecked, setWednesdayChecked] = useState(false);
    const [thursdayChecked, setThursdayChecked] = useState(false);
    const [fridayChecked, setFridayChecked] = useState(false);
    const [saturdayChecked, setSaturdayChecked] = useState(false);


    useEffect(() => {
        if (event && event.groupId) {
            setRecChecked(true);
            setExtendedForm(true);
        } else {
            setRecChecked(false);
        }
        if (event && event.allDay && event.allDay == true) {
            setAllDayChecked(true);
        } else {
            setAllDayChecked(false);
        }
        if (event && event.extendedProps.multipleDays && event.extendedProps.multipleDays == true) {
            setMultipleDates(true);
        } else {
            setMultipleDates(false);
        }
        if (event && event.extendedProps.recurDays && event.extendedProps.recurDays.includes('Sunday')) {
            setSundayChecked(true);
        } else {
            setSundayChecked(false);
        }
        if (event && event.extendedProps.recurDays && event.extendedProps.recurDays.includes('Monday')) {
            setMondayChecked(true);
        } else {
            setMondayChecked(false);
        }
        if (event && event.extendedProps.recurDays && event.extendedProps.recurDays.includes('Tuesday')) {
            setTuesdayChecked(true);
        } else {
            setTuesdayChecked(false);
        }
        if (event && event.extendedProps.recurDays && event.extendedProps.recurDays.includes('Wednesday')) {
            setWednesdayChecked(true);
        } else {
            setWednesdayChecked(false);
        }
        if (event && event.extendedProps.recurDays && event.extendedProps.recurDays.includes('Thursday')) {
            setThursdayChecked(true);
        } else {
            setThursdayChecked(false);
        }
        if (event && event.extendedProps.recurDays && event.extendedProps.recurDays.includes('Friday')) {
            setFridayChecked(true);
        } else {
            setFridayChecked(false);
        }
        if (event && event.extendedProps.recurDays && event.extendedProps.recurDays.includes('Saturday')) {
            setSaturdayChecked(true);
        } else {
            setSaturdayChecked(false);
        }
    }, [event]);




    //if checkbox is checked, sets extendedForm to true
    const handleRecCheckbox = (e) => {
        setRecChecked(e.target.checked);
        setExtendedForm(e.target.checked);
    }


    const handleAllDayCheckbox = (e) => {
        setAllDayChecked(e.target.checked);
    }


    const handleMulCheckbox = (e) => {
        setMultipleDates(e.target.checked);
    }


    const handleSundayCheckbox = (e) => {
        setSundayChecked(e.target.checked);
    }


    const handleMondayCheckbox = (e) => {
        setMondayChecked(e.target.checked);
    }


    const handleTuesdayCheckbox = (e) => {
        setTuesdayChecked(e.target.checked);
    }


    const handleWednesdayCheckbox = (e) => {
        setWednesdayChecked(e.target.checked);
    }


    const handleThursdayCheckbox = (e) => {
        setThursdayChecked(e.target.checked);
    }


    const handleFridayCheckbox = (e) => {
        setFridayChecked(e.target.checked);
    }


    const handleSaturdayCheckbox = (e) => {
        setSaturdayChecked(e.target.checked);
    }


    const formatStartDate = event?.start ? new Date(event.start).toLocaleDateString('en-US', { timeZone: 'America/Chicago' }) // Adjust timeZone as needed
        : "";


    const formatEndDate = event?.end ? new Date(event.end).toLocaleDateString('en-US', { timeZone: 'America/Chicago' }) // Adjust timeZone as needed
        : "";


    //returns the form display
    return (
        <div className="modal-overlay">
            <div id="form-modal">
                <div id="form-header">
                    <div id="form-icon">
                        <div id="form-close" class="header-icon" onClick={() => {
                            setOpenForm(false);
                        }}>
                            <BsBoxArrowRight />
                        </div>
                    </div>
                </div>
                <div id="form">
                    <form onSubmit={onSubmit}>
                        <fieldset id="form-fields">
                            <div id="row1">
                                <textarea type="text" id="title" name="title" multiline="true" defaultValue={event?.title} placeholder="Event Name..." required/>
                            </div>
                            <div id="row2">
                                <div id="all-day-div">
                                    <label for="allday" className="row2-label">All day? </label>
                                    <input type="checkbox" id="allday" name="allday" className="row2-input" checked={allDayChecked} onChange={handleAllDayCheckbox}/>
                                </div>
                                <div id="multiple-days-div">
                                    <label for="multiple" className="row2-label">Multiple dates? </label>
                                    <input type="checkbox" id="multiple" name="multiple" className="row2-input" checked={multipleDates} onChange={handleMulCheckbox} />
                                </div>
                            </div>
                            <div id="row3">
                                <input type="date" id="dateS" name="dateS" defaultValue={formatStartDate ? new Date(formatStartDate).toISOString().split('T')[0] : startDate} required/>
                                {multipleDates && (
                                    <label for="row3" className="until">until</label>
                                )}
                                {multipleDates && (
                                    <input type="date" id="dateE" name="dateE" defaultValue={formatEndDate ? new Date(formatEndDate).toISOString().split('T')[0] : ""} />
                                )}
                            </div>
                            <div id="row4">
                                <input type="time" id="start" name="start" defaultValue={event?.start ? new Date(event.start).toTimeString().split(' ')[0] : ""} required/>
                                <label for="row4"className="until">until</label>
                                <input type="time" id="end" name="end" defaultValue={event?.end ? new Date(event.end).toTimeString().split(' ')[0] : ""} />
                            </div>
                            <div id="row5">
                                <textarea type="text" id="location" name="location" multiline="true" defaultValue={event?.extendedProps.location ? event?.extendedProps.location : ""} placeholder="Add location..." />
                            </div>
                            <div id="row6">
                                <textarea type="text" id="notes" name="notes" multiline="true" defaultValue={event?.extendedProps.notes ? event?.extendedProps.notes : ""} placeholder="Add notes..." />
                            </div>
                            <div id="row7">
                                <label for="recurring" id="recurring-label">Recurring? </label>
                                <input type="checkbox" id="recurring" name="recurring" checked={recChecked} onChange={handleRecCheckbox} />
                            </div>
                            {extendedForm && (
                                <div id="recurring-extension">
                                    <div id="row8">
                                        <div>
                                            <input type="checkbox" id="Sunday" name="Sunday" value="Sunday" checked={sundayChecked} onChange={handleSundayCheckbox}/>
                                            <label for="Sunday">Sun</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="Monday" name="Monday" value="Monday" checked={mondayChecked} onChange={handleMondayCheckbox}/>
                                            <label for="Monday">Mon</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="Tuesday" name="Tuesday" value="Tuesday" checked={tuesdayChecked} onChange={handleTuesdayCheckbox}/>
                                            <label for="Tuesday">Tues</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name="Wednesday" value="Wednesday" checked={wednesdayChecked} onChange={handleWednesdayCheckbox}/>
                                            <label for="Wednesday">Wed</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name="Thursday" value="Thursday" checked={thursdayChecked} onChange={handleThursdayCheckbox}/>
                                            <label for="Thursday">Thurs</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name="Friday" value="Friday" checked={fridayChecked} onChange={handleFridayCheckbox}/>
                                            <label for="Friday">Fri</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name="Saturday" value="Saturday" checked={saturdayChecked} onChange={handleSaturdayCheckbox}/>
                                            <label for="Saturday">Sat</label>
                                        </div>
                                    </div>
                                    <div id="row9">
                                        <input type="date" id="startRec" name="startRec" defaultValue={event?.extendedProps.formatRecurStart ? event?.extendedProps.formatRecurStart : ""} />
                                        <label for="row9" className="until">until</label>
                                        <input type="date" id="endRec" name="endRec" defaultValue={event?.extendedProps.formatRecurEnd ? event.extendedProps.formatRecurEnd : ""} />
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <div id="submit">
                            <button type="submit" id="submit-button">Add Event</button>
                        </div>
                    </form>
                </div>
                <div id="form-footer"></div>
            </div>
        </div>
    )
}


export default Form;



