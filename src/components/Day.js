import './Day.css'

// const AllDays = ["TUE 7", "WED 8", "THU 9", "FRI 10", "SAT 11", "SUN 12", "MON 13"]

export default function Day({ day, selected, changeSelectedIndex }) {

    return (
        <div className={`day ${selected ? 'selected' : ''}`}>
            <span className='week-day'>{day.slice(0,3)}</span>
            <span className='date'>{day.slice(4)}</span>
        </div>    
    );
}
