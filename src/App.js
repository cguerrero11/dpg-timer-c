import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
// import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Card, Form, Button, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // const totalWorkTime = useState();
  
  const current = new Date();
  const [startTime, handleStartTime] = useState(current);

  const [endTime, handleEndTime] = useState(current);

  const [qty, handleQty] = useState(0);

  const [input, handleInput] = useState('');

  const [message, setMessage] = useState('');

  const [timeMsg, setTimeMsg] = useState('');

//3
const subtractTime = (start, end) => {
    var startHours = start.getHours();
    var startMinutes = start.getMinutes();
    var endHours = end.getHours();
    var endMinutes = end.getMinutes();

    var subtract = 0;
    
    if(startHours < 9){
        subtract = subtract - 15;
        console.log('subtract 1 15');
    } 
    
    if(startHours <= 11 && startMinutes < 45){
        console.log('subtract 2 15');
        subtract = subtract - 30;
    } 
    
    if(startHours < 15){
        console.log('subtract 3 15');
        subtract = subtract - 15;
    }

    if(endHours === 9 && endMinutes < 15){
        console.log('add 1 15');
        subtract = subtract + 15;
    } else if(endHours === 12 && endMinutes < 15){
        console.log('add 2 15');
        subtract = subtract + 30;
    } else if (endHours === 15 && endMinutes < 15){
        console.log('add 3 15');
        subtract = subtract + 15;
    }

    console.log(subtract);
    //if 60 mins, subtract hour
    if (subtract === -60){
        return 1;
    } else {
        return subtract;
    }

}
//TODO: returns -amount of mins, parameter of time current
const displayTime = (hours, mins) => {
    var displayHours = hours + ' Hours and ' + mins + ' minutes';

    if(hours === 1){
        displayHours = hours + ' Hour and ' + mins + ' minutes';
    } 
    return displayHours;
}

const calcHourDiff = (start, end) => {
    var startHours = parseInt(start.getHours());
    var endHours = parseInt(end.getHours());
    var hourDiff = endHours - startHours;
    return hourDiff;
}
//2
const calcTimeDiff = (start, end) => {
    var startMinutes = parseInt(start.getMinutes());
    var endMinutes = parseInt(end.getMinutes());
    var calcMin = 0;
    var hourDiff = calcHourDiff(start, end);
    console.log(hourDiff + ' hrs');

    if(endMinutes < startMinutes){
        calcMin = endMinutes - startMinutes;
        calcMin = 60 + calcMin;
        hourDiff--;
        if(hourDiff < 0){
            console.log('Invalid time frame.');
            //TODO: edit message for invalid time frame
        }
        console.log(hourDiff + ' hrs-');
    } else if (endMinutes >= startMinutes) {
        calcMin = endMinutes - startMinutes;
    }
    console.log(calcMin + ' mins');
    setTimeMsg(displayTime(hourDiff, calcMin));

}
//1
 const handleTimeDiff = (e) => {
    handleInput(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
    }));
    // console.log(startTime, endTime)
    // console.log(input)
    console.log(startTime.getHours())
    console.log(startTime.getMinutes())
    calcTimeDiff(startTime, endTime)
    subtractTime(startTime, endTime)


    // setMessage('Yes');

    if(!isNaN(parseInt(+input))){
        console.log('Input accepted')
        handleQty(parseInt(input, 10))
    } else {
        setMessage('Please enter a number.');
    }



//    const totalWorkTime = endTime - startTime;
//   if (startTime >= (7 * 60 * 60)  ) {
//       // morning break (between 9am & 9:15)
//       let morningBreakStartTime = '9:00';

//       let morningBreakEndTime = '9:15';

//       let morningBreak = (morningBreakEndTime - morningBreakStartTime);

//       return morningBreak;


//   } else if (startTime >= '9:15' ) {
//        // lunch break (between 11:45 & 12:15)
//        let lunchStartTime = '11:45';

//        let lunchEndTime = '12:15';

//        let lunchBreak = (lunchEndTime - lunchStartTime);

//        return lunchBreak;

//   } else if (startTime >= '12:45' ) {
//       // afternoon break (between 14:45 & 15:00)
//       let afterNoonBreakStartTime = '14:45';

//       let afterNoonBreakEndTime = '15:00';

//       let afterNoonBreak = (afterNoonBreakEndTime - afterNoonBreakStartTime);

//       console.log(afterNoonBreak)
//       return afterNoonBreak;

//  } else {

//   // return totalWorkTime;
//   // let totalWorkTime = (endTime - startTime - afterNoonBreak - lunchBreak - morningBreak);

//   // return totalWorkTime;
//  }
 }
//  console.log(handleTimeDiff)
  return (
    <div>
        <div className='time-card'>
            <Card>
            <Card.Body>
                <h2>DPG Time Tracker</h2>
                <Form>
                    <Form.Label>
                        <div className='input-group mb-3'>
                        <label name="start-time" id='startTime' >Start Time: </label>  <DatePicker
                                                                                        selected={startTime}
                                                                                        onChange={(time) => handleStartTime(time)}
                                                                                        showTimeSelect
                                                                                        showTimeSelectOnly
                                                                                        timeIntervals={15}
                                                                                        name="StartTime"
                                                                                        dateFormat="h:mm aa"
                        />   
                        </div>
                        <div className='input-group mb-3'>
                        <label name="end-time" id='endTime'>End Time: </label> <DatePicker
                                                                                        selected={endTime}
                                                                                        onChange={(time) => handleEndTime(time)}
                                                                                        showTimeSelect
                                                                                        showTimeSelectOnly
                                                                                        timeIntervals={15}
                                                                                        name="EndTime"
                                                                                        dateFormat="h:mm aa"
                            />  
                        </div>
                        <div className='input-group mb-3'>
                        <label name="qty" id='quantity'>Quantity: </label> <input type="text" onInput={(e) => handleTimeDiff(e)}/> 
                        </div>
                    </Form.Label>
                        
                </Form>
                <Button className='w-100' onClick={handleTimeDiff}>Submit</Button>

            </Card.Body>

            </Card>

            <Card>
                <Container>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <th>
                                    <h3>Calucated hours: {message}</h3>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <h3>Quantity: {qty}</h3>
                                    {/* <h3>Quantity/Hour: {qty}/hour</h3> */}
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    Hours: {timeMsg}
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                        
                        
                    <div>

                    </div>
                </Container>
            </Card>

            </div>
        </div>
  );
}

export default App;
