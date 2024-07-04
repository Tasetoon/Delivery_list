import React, {useEffect, useStatem, useRef, useState} from 'react'
import Order from './components/Order'
export default function index() {
    const [data, setData] = useState({});
    const [positions, setPositions] = useState([]);
    useEffect(() => {
    fetch('http://localhost:8080/order')
              .then((response) => response.json())  
              .then((data) => {
                setData(data);
                setPositions(data.positions);
        })
  }, []);

  return (
    <div>
        <div className='margin-top'>
            <h1 className="text-center font-extrabold text-white padding-top label-font">BigGeek Web-App</h1>
        </div>  
        <Order
            input_data = {data}
            positions = {positions}
        />
    </div>
  )
}