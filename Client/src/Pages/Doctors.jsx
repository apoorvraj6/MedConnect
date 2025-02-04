import React, { useContext,useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';


function Doctors() {

    const {speciality} = useParams();
    const [filterDoc,setFilterDoc] = useState([])
    const [showFilter,setShowFilter] = useState(false);
    const navigate = useNavigate();
    
    const {doctors} = useContext(AppContext)

    const applyFilter = ()=>{
        if(speciality){
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
        }
        else{
            setFilterDoc(doctors);
        }
    }

    useEffect(()=>{
        applyFilter();
    },[doctors,speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={()=>setShowFilter(prev => !prev)} className={`py-1 px-3 rounded text-sm translate-all sm:hidden ${showFilter?'bg-primary text-white' :''}`}>Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' :'hidden sm:flex'}`}>
            <p onClick={()=>speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician ')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General Physician" ? "bg-indigo-200 text-black" : ""}`}>General Physician</p>
            <p onClick={()=>speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-200 text-black" : ""}`}>Gynecologist</p>
            <p onClick={()=>speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-200 text-black" : ""}`}>Dermatologist</p>
            <p onClick={()=>speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-200 text-black" : ""}`}>Pediatricians</p>
            <p onClick={()=>speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-200 text-black" : ""}`}>Neurologist</p>
            <p onClick={()=>speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-200 text-black" : ""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
            {filterDoc.map((item,index)=>(
              item.available && 
                <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hideen cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:border-blue-900 hover:border-2
                '>
                  <img className='bg-blue-50 ' src={item.image} alt="" />
                  <div className='p-4 '>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                        <p>Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>  
                </div>))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
