import React, { useContext,useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctos from '../Components/RelatedDoctos';
import { toast } from 'react-toastify';
import axios from 'axios'

function Appointment() {

  const {docId} = useParams();
  const {doctors,currencySymbol,backendUrl,token,getDoctorsData} = useContext(AppContext)
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const navigate = useNavigate();
  const [docInfo,setDocInfo] = useState("");
  const [docSlots,setDocSlots] = useState([]);
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState("")
  

  const fetchdocInfo = async () =>{
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo);
    
  }

  const getAvailableSlots = async () => {
    setDocSlots([]); // Reset the slots
  
    let today = new Date();
    const endHour = 21; // End time is 9 PM
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i); // Advance the date
  
      // Set start time based on whether it's today or a future day
      if (i === 0) {
        // If it's today, start from the next available half-hour slot
        currentDate.setMinutes(
          currentDate.getMinutes() > 30 ? 30 : 0
        );
        currentDate.setHours(
          currentDate.getHours() >= 10 ? currentDate.getHours() + 1 : 10
        );
      } else {
        // For future days, start at 10:00 AM
        currentDate.setHours(10, 0, 0, 0);
      }
  
      let endTime = new Date(currentDate);
      endTime.setHours(endHour, 0, 0, 0); // Set end time to 9 PM of the same day
  
      let timeslots = [];
  
      // Generate time slots
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() +1;
        let year = currentDate.getFullYear();

        const slotDate = day +"_"+month+"_"+year;
        const slotTime = formattedTime;

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false :true

        if(isSlotAvailable){
          timeslots.push({
            datetime: new Date(currentDate), // Clone the current time
            time: formattedTime,
          });

        }
  
        
  
        currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
      }
  
      // Update state with the generated time slots
      setDocSlots((prev) => [...prev, timeslots]);
    }
  };

  const bookAppointment = async() =>{

    if(!token){
      toast.warn('Login to book Appointment');
      return navigate('/login');
    }

    try {
      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day +"_" +month +"_" + year;
      
      const {data} = await axios.post(backendUrl +'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}});

      if(data.success){
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments')
      }else{
        toast.error(data.message);
      }
        

    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  }
  

  useEffect(()=>{
    fetchdocInfo()
  },[doctors,docId])

  useEffect(()=>{
    getAvailableSlots();
  },[docInfo])

  useEffect(()=>{
    console.log(docSlots);
  },[docSlots])

  return docInfo && (
    <div>
      {/* doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 border-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img src={assets.verified_icon} className="w-5" alt="" /></p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600 '>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>


          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-2 item-center w-full overflow-x-scroll'>
          {
            docSlots.length && docSlots.map((item,index)=>(
              <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ?'bg-primary text-white':'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item,index)=>(
            <p onClick={()=>{setSlotTime(item.time)}} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ?'bg-primary text-white':'text-gray-400 border border-gray-300'}`} key={index}>{item.time.toLowerCase()}</p>
          ))}
        </div>

        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6' onClick={bookAppointment}>Book an appointment</button>
      </div>
      <RelatedDoctos docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment
