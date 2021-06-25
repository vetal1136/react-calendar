import React, { useState, useEffect, } from 'react';
import moment from 'moment';
import {Header} from '../Header';
import {Monitor} from '../Monitor';
import {CalendarGrid} from '../CalendarGrid';
import styled from "styled-components";

const ShadowWrapper = styled('div')`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
`;

const url = 'http://localhost:5000'
const totalDays = 42;

function App() {

  window.moment = moment;

  moment.updateLocale('en', {week: {dow: 1}});
  // const today = moment();
  const [today, setToday] = useState(moment());
  const [events, setEvents] = useState([]);
  const startDay = today.clone().startOf('month').startOf('week');
  const startDateQuery = startDay.clone().format('x');
  const endDateQuery = startDay.clone().add(totalDays, 'days').format('x');
  

  const prevHandler = () => {
    console.log('prev')
    setToday(prev => prev.clone().subtract(1, 'month'))
  };
  const todayHandler = () => setToday(moment());
  const nextHandler = () => {
    setToday(prev => prev.clone().add(1, 'month'))
  };


  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
    .then(res => res.json())
    .then(res => {
      console.log('Response', res);
      setEvents(res);
    });
  }, []);

  return (
    <ShadowWrapper>
     <Header />
     <Monitor
      today = {today}
      prevHandler={prevHandler}
      todayHandler={todayHandler}
      nextHandler={nextHandler}
       />
     <CalendarGrid startDay={ startDay } today={today} totalDays={totalDays}/>
    </ShadowWrapper>
  );
}

export default App;
