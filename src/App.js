import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import TimePicker from 'react-bootstrap-time-picker';
import { Card, Form, Button, Container} from 'react-bootstrap'
import './App.css';

function App() {
  // const totalWorkTime = useState();

  const [startTime, handleStartTime] = useState();

  const [endTime, handleEndTime] = useState();

  // const morningBreak = useState();

  // const lunchBreak = useState();

  // const afterNoonBreak = useState();

  const [message, setMessage] = useState('');




 const handleTimeDiff = () => {

  
  console.log(startTime, endTime)
//    const totalWorkTime = endTime - startTime;
  if (startTime >= (7 * 60 * 60)  ) {
      // morning break (between 9am & 9:15)
      let morningBreakStartTime = '9:00';

      let morningBreakEndTime = '9:15';

      let morningBreak = (morningBreakEndTime - morningBreakStartTime);

      return morningBreak;


  } else if (startTime >= '9:15' ) {
       // lunch break (between 11:45 & 12:15)
       let lunchStartTime = '11:45';

       let lunchEndTime = '12:15';

       let lunchBreak = (lunchEndTime - lunchStartTime);

       return lunchBreak;

  } else if (startTime >= '12:45' ) {
      // afternoon break (between 14:45 & 15:00)
      let afterNoonBreakStartTime = '14:45';

      let afterNoonBreakEndTime = '15:00';

      let afterNoonBreak = (afterNoonBreakEndTime - afterNoonBreakStartTime);

      console.log(afterNoonBreak)
      return afterNoonBreak;

 } else {

  // return totalWorkTime;
  // let totalWorkTime = (endTime - startTime - afterNoonBreak - lunchBreak - morningBreak);

  // return totalWorkTime;
 }
  
 }
 console.log(handleTimeDiff)
  return (
    <div>
        <div className='time-card'>
            <Card>
            <Card.Body>
                <h2>DPG Time Tracker</h2>
                <Form>
                    <Form.Label>
                        <div className='input-group mb-3'>
                        <label for="start-time" id='startTime' >Start Time: </label>  <TimePicker onChange = {time => handleStartTime(time) } 
                                value = {startTime}
                        ></TimePicker>   
                        </div>
                        <div className='input-group mb-3'>
                        <label for="end-time" id='endTime'>End Time: </label> <TimePicker onChange = {time => handleEndTime(time) } 
                                value = {endTime} ></TimePicker>
                        </div>
                        
                    </Form.Label>
                        
                </Form>
                <Button className='w-100' onClick={handleTimeDiff}>Submit</Button>

            </Card.Body>

            </Card>

            <Card>
                <Container>
                    <div>
                    <h3>You worked a total of : {message}</h3>
                    </div>
            
                </Container>
            </Card>

            </div>
        </div>
  );
}

export default App;
