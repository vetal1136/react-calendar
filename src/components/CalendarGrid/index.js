import React from "react";
import styled from "styled-components";
import moment from 'moment';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${props => props.isHeader ? '#1E1F21' : '#404040'};
  ${props => props.isHeader && 'border-bottom: 1px solid #404040'};
`;

const CellWrapper = styled.div`
  min-width: 140px;
  min-height: ${props => props.isHeader ? 24 : 80}px;
  background-color: ${props => props.isWeekend ? '#272829' : '#1E1F21'};
  color: ${props => props.isSelectedMonth ? '#DDDCDD' : '#555759'}; 

`;

const RowInCell = styled.div`
    display: flex;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-stert'};
    ${props => props.pr && 'padding-right: ${props.pr * 8}px'}
`;


const DayWrapper = styled.div`
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;

const CurrentDay = styled('div')`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const CalendarGrid = ({startDay, today}) => {

  const totalDays = 42;
  const day = startDay.clone().subtract(1, 'day');
  const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());
  
  const isCurrentDay = (day) => moment().isSame(day, 'day');
  const isSelectedMonth = (day) => today.isSame(day, 'month');

  return(
    <>
      <GridWrapper isHeader>
      {[...Array(7)].map((_, i) => (
        <CellWrapper isHeader isSelectedMonth>
        <RowInCell justifyContent={'flex-end'} pr={1}>
          {moment().day(i + 1).format('ddd')}
          </RowInCell>
        </CellWrapper>
      ))}
    </GridWrapper>
    <GridWrapper>
      {
        daysArray.map((dayItem) => (
          <CellWrapper
          key={dayItem.format('DDMMYYYY')}
           isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
           key={dayItem.unix()}
           isSelectedMonth={isSelectedMonth(dayItem)}
          >
            <RowInCell
            justifyContent={'flex-end'}>
              <DayWrapper>
                  {!isCurrentDay(dayItem) && dayItem.format('D')}
                  {isCurrentDay(dayItem) && <CurrentDay>{dayItem.format('D')}</CurrentDay>}
              </DayWrapper>
            </RowInCell>
          </CellWrapper>
        ))
      }
    </GridWrapper>
    </>
  );
};

export { CalendarGrid };