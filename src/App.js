import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Card, Form, Button, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  
  const current = new Date();

  const [startTime, handleStartTime] = useState(current);

  const [endTime, handleEndTime] = useState(current);

  const [qty, handleQty] = useState(1);

  const [qtyPerHour, handleQtyPerHour] = useState(0);

  const [message, setMessage] = useState('');

//   const [timeMsg, setTimeMsg] = useState('');

  const handleChange = event => {
    var num = parseFloat(event.target.value);
    
    if(!isNaN(num)){
        if (num < 0){
            setMessage('Please enter a valid number.');
        } else {
            handleQty(parseFloat(num));
            setMessage('');
        }
    }
  };
//3 returns -amount of mins, parameter of current time
const subtractTime = (start, end) => {
    var startHours = start.getHours();
    var startMinutes = start.getMinutes();
    var endHours = end.getHours();
    var endMinutes = end.getMinutes();
    var totalStartMinutes = (startHours * 60) + startMinutes;
    var totalEndMinutes = (endHours * 60) + endMinutes;

    // setTimeMsg('From ' + startHours + ':' + startMinutes + ' to ' + endHours + ':' + endMinutes)

    var subtract = 0;

    //9 to 9:15
    if(totalStartMinutes < 540 && totalEndMinutes > 555){
        subtract = subtract + 15;
        console.log('subtract 1 15');
    } 
    
    //11:45 to 12:15
    if(totalStartMinutes < 705 && totalEndMinutes > 735){
        console.log('subtract 2 30');
        subtract = subtract + 30;
    } 
    
    //3 to 3:15
    if(totalStartMinutes < 900 && totalEndMinutes > 915){
        console.log('subtract 3 15');
        subtract = subtract + 15;
    }

    

    console.log(subtract);
    if (subtract === 60){
        return 1;
    } else {
        return subtract;
    }
}

//divides qty by hours worked
const divideByQuantity = (hours, mins) => {
    var totalHrs = hours + (mins/60);
    var qtyPerHour = qty / totalHrs;
    console.log(hours + ' hours!');
    console.log(qtyPerHour.toFixed(2) + '/hour');
    handleQtyPerHour(Math.floor(qtyPerHour));
}
//displays time
const displayTime = (hours, mins) => {
    divideByQuantity(hours, mins);
    var displayHours = hours + ' Hours and ' + mins + ' minutes';

    if(hours === 1){
        displayHours = hours + ' Hour and ' + mins + ' minutes';
    } 
    return displayHours;
}

//calculates hour difference
const calcHourDiff = (start, end) => {
    var startHours = parseInt(start.getHours());
    var endHours = parseInt(end.getHours());
    var hourDiff = endHours - startHours;
    return hourDiff;
}
//2 calcs time difference, input checking
const calcTimeDiff = (start, end) => {
    var startMinutes = parseInt(start.getMinutes());
    var endMinutes = parseInt(end.getMinutes());
    var calcMin = 0;
    var hourDiff = calcHourDiff(start, end);
    
    if(endMinutes < startMinutes){
        calcMin = endMinutes - startMinutes;
        calcMin = 60 + calcMin;
        hourDiff--;
        if(hourDiff < 0){
            setMessage('Invalid time frame.');
            handleQty(0);
            return;
        }
        console.log(hourDiff + ' hrs-');
    } else if (endMinutes >= startMinutes) {
        calcMin = endMinutes - startMinutes;
        if(hourDiff < 0){
            setMessage('Invalid time frame.');
            handleQty(0);
            return;
        }
    }
    console.log(hourDiff + ' hours and ' + calcMin + ' minutes');
    var subtract = subtractTime(start, end);

    if (subtract === 1) {
        //subtract hour from hourdiff
        hourDiff = hourDiff - 1;
    } else {
        //check if mins go negative, subtract hour and add remainder mins
        if(calcMin < subtract){
            calcMin = calcMin - subtract;
            calcMin = 60 + calcMin;
            hourDiff--;
            if(hourDiff < 0){
                console.log('Negative hour.');
            }
            console.log(hourDiff + ' hrs-');
        } else if (calcMin >= subtract) {
            calcMin = calcMin - subtract;
        }
        //divide by quantity in setmessage
    }
    setMessage(displayTime(hourDiff, calcMin));

}
//1
 const handleTimeDiff = (e) => {
    console.log(startTime.getHours())
    console.log(startTime.getMinutes())
    calcTimeDiff(startTime, endTime)
    console.log('-----')
 }
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
                            
                        <label name="qty" id='quantity'>Quantity: </label> 
                        </div>
                        <input type="tel" id='qty' name='qty' onChange={(e) => handleChange(e)}/> 
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
                                    <h3>Quantity per Hour: {qtyPerHour}/hour</h3>
                                    {/* <h3>Quantity/Hour: {qty}/hour</h3> */}
                                </th>
                            </tr>
                            {/* <tr>
                                <th>
                                    Time: {timeMsg}
                                </th>
                            </tr> */}
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
