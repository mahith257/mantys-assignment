import { Box, Modal, Typography } from '@mui/material'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDetails, selectDay } from '../features/daySlice';
import './Slots.css'
import CloseIcon from '@mui/icons-material/Close';

export default function Slots({ day, timeSlot }) {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const days = useSelector(selectDay)
    const [name, setName] = useState(days[day] && days[day][timeSlot] ? days[day][timeSlot].name : '')
    const [phoneNumber, setPhoneNumber] = useState(days[day] && days[day][timeSlot] ? days[day][timeSlot].phoneNumber : '')

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(name, phoneNumber)
        if(name.length < 3){
            setError('Name should be atleast 3 character long')
        }else if(phoneNumber.length === 10){
            setError(null)
            dispatch(addDetails({
                day,
                timeSlot,
                details: {
                    name,
                    phoneNumber
                }
            }))
            setOpen(false)
        }else{
            setError('Phone number should be ten digits long')
        }
    }

    const handleClose = () => {
        setName(days[day] && days[day][timeSlot] ? days[day][timeSlot].name : '')
        setPhoneNumber(days[day] && days[day][timeSlot] ? days[day][timeSlot].phoneNumber : '')
        setOpen(false)
    }

    const style = {
        display:"flex",
        alignItems: "center",
        justifyContent: "center"
    }

    return (
        <>
        <div key={timeSlot} className={`slot ${days[day] && days[day][timeSlot] && days[day][timeSlot].name !== '' ? 'filled' : ''}`} onClick={() => setOpen(true)}>
            {timeSlot}
            <div className='info'>
                {days[day] && days[day][timeSlot] && days[day][timeSlot].name !== '' && (<div className='name'>{days[day][timeSlot].name}</div>)}
                {days[day] && days[day][timeSlot] && days[day][timeSlot].phoneNumber !== '' && (<div className='phone-number'>{days[day][timeSlot].phoneNumber}</div>)}
            </div>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={style}
        >
            <Box width={350} p={3} bgcolor={"background.default"} color={"text.primary"} borderRadius={5} className='modal-container'>
                {
                    days[day] && days[day][timeSlot] && days[day][timeSlot].name !== '' ? <Typography variant="h6" textAlign="center">Edit call details</Typography> : 
                    <Typography variant="h6" textAlign="center">Schedule a call</Typography>
                }
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Name</span>
                        <input 
                            type='text'
                            required
                            onChange = {(e) => setName(e.target.value)}
                            value = {name}
                            placeholder='John'
                            autoFocus
                        />
                    </label>
                    <label>
                        <span>Phone Number</span>
                        <div className='phone'>
                            <div className='country-code'>
                                +91
                            </div>
                            <input 
                                type='number'
                                required
                                onChange = {(e) => setPhoneNumber(e.target.value)}
                                value = {phoneNumber}
                                placeholder = '9812763490'
                            />
                        </div>
                    </label>
                    {error && <p className='error'>{error}</p>}
                    <button>Schedule</button>
                    <p className='close-modal' onClick={handleClose}><CloseIcon sx={{fontSize: 20}} /></p>
                </form>
            </Box>
        </Modal>
        </>
    );
}
