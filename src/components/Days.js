import React from 'react';
import { DateAndDay } from './StyledComponent';

function getDateAndDay(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const week = ['SUN', 'MON', 'TUES', 'WEDNES', 'THURS', 'FRI', 'SATUR'];
  const dayOfWeek = week[date.getDay()];

  return {
    year, month, day, dayOfWeek
  }
};

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const todayDate = getDateAndDay(today); 
const tomorrowDate = getDateAndDay(tomorrow);

export function Today() {
  return (
    <DateAndDay>
      <div className='date'>
        <p>{todayDate.dayOfWeek}DAY,</p>
        <span>{todayDate.year}. {todayDate.month}. {todayDate.day}</span>
      </div>
    </DateAndDay>
  )
};

export function Tomorrow() {
  return (
    <DateAndDay>
      <div className='date'>
        <p>{tomorrowDate.dayOfWeek}DAY,</p>
        <span>{tomorrowDate.year}. {tomorrowDate.month}. {tomorrowDate.day}</span>
      </div>
    </DateAndDay>
  )
};