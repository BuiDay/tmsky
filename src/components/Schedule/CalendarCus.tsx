import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core'
import React, { useState } from 'react';
import { Button } from 'antd';
import { AiFillVideoCamera } from 'react-icons/ai';
import ComfirmScheduleModal from './ComfirmScheduleModal';

interface IProps {
  showModal?: any
  listSchedule?: any
}

//<div style={{backgroundColor:"#ff4d4d",borderRadius:"7px",padding:"3px",color:"white"}}>
function renderEventContent(eventInfo: any) {
  const isComform = (eventInfo.event.extendedProps?.isComfirm)
  const coachColor = `#${(eventInfo.event.extendedProps?.coaches?.users.id)?.toString()?.slice(0, 6)}`
  const customerColor = `#${(eventInfo.event.extendedProps?.customers?.users.id)?.toString()?.slice(0, 6)}`
  return (
    <div>
      <div className={`inline-block fc-daygrid-event-dot ${isComform ? "border-comfirmed" : "border-comfirm"}`}></div>
      <span className='fc-event-time text-xs'>{eventInfo.timeText}:</span>
      <span className='fc-event-title whitespace-normal text-xs' style={{ color: customerColor }}>{eventInfo.event.title}</span>
      <span className='text-xs'>
        <span style={{ color: coachColor }}> ({eventInfo.event.extendedProps?.coaches?.users?.FullName})</span>
      </span>
    </div>
  )
}

const CalendarCus: React.FC<IProps> = ({ showModal, listSchedule }) => {
  const [isHide, setIsHide] = useState(true);
  const [isComfirmModalOpen, setIsComfirmModalOpen] = useState(false);
  const [idSchedule, setIdSchedule] = useState<string>()

  const showModal_v3 = (id: string) => {
    setIdSchedule(id)
    setIsComfirmModalOpen(true);
  }


  return (
    <div className="App">
      <Button onClick={()=>setIsHide(!isHide)}> {!isHide ? " Hide" : "Show all"} </Button>
      <FullCalendar
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false
        }}
        dayMaxEvents={isHide}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        eventContent={renderEventContent}
        initialView="dayGridMonth"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay new',
        }}
        customButtons={{
          new: {
            text: 'new',
            click: () => showModal(),
          },
        }}
        events={listSchedule}
        eventColor="red"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => showModal_v3(e.event.id)}
      />
      <ComfirmScheduleModal isModalOpen={isComfirmModalOpen} setIsModalOpen={setIsComfirmModalOpen} idSchedule={idSchedule} />
      <div className='mt-4 flex justify-end'>
        <div className=' w-[210px] border rounded-md p-3'>
          <div className='flex items-center gap-2 justify-between'>
            <div className='fc-daygrid-event-dot border-comfirmed'></div>
            <span className='text-sm'>Confirmed by coach</span>
          </div>
          <div className='flex items-center gap-2 justify-between'>
            <div className='fc-daygrid-event-dot border-comfirm'></div>
            <span className='text-sm'>Unconfirmed by coach</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarCus;

// const date = new Date('2023-07-14T18:30:05.000');
// date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
// console.log(date)