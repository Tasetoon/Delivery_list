import React, {useEffect, useStatem, useRef, useState} from 'react'
import Router from 'next/router'
import Order from './components/Order'
import Footer from './components/Footer';
export default function index() {
  const [data, setData] = useState([]);
  const [total_price, setTotal] = useState();
  const [delivery_price, setDelivery] = useState();
  const [to_cashier, setCashier] = useState();
  const [style, setStyle] = useState('hidden');


  useEffect(() => {
  fetch('http://5.42.220.196/orders')
            .then((response) => response.json())  
            .then((data) => {
                setData(data.orders);
                setTotal(data.total_price);
                setDelivery(data.delivery_price);
                setCashier(data.to_cashier);       
      })
  }, []);

  const handleClickRefresh = async (e) => {
    e.preventDefault()
    Router.reload();
  }

  const handleClickResult = async (e) => {
    e.preventDefault()
    setStyle('m-10 flex')
  }

  return (
    <div className='wrapper'>
      <header className='header'>
      </header>
      <main className='main'>
        <div className='overflow-hidden'>
          <div className='mt-10'>
            {data.length > 0 ? (  
            <div>
              {data.map(order => (
                  <Order
                    input_data = {order}
                    positions = {order.positions}
                  />
                ))}
            </div>
              ) : (
                <h1 className='text-center font-extrabold text-white padding-top label-font '>Loading...</h1>
              )}
          </div>
          <div className='m-10 mb-3 flex justify-between'>
            <button onClick={handleClickRefresh} className='text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-5 focus:outline-none focus:ring-blue-800 font-medium text-center mb-2 p-3 rounded-md'>
              СБРОС
            </button>
            <button onClick={handleClickResult} className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-5 focus:outline-none focus:ring-blue-800 font-medium text-center mb-2 p-3 rounded-md'>
              Посчитать меня
            </button>
          </div>
          <div className={style}>
              <ul>
                <li className='w-full border-b border-gray-900 text-white'>Общая сумма - {total_price}</li>
                <li className='w-full border-b border-gray-900 text-white'>Сумма за доставки - {delivery_price}</li>
                <li className='w-full border-b border-gray-900 text-white'>Вы должны отдать - {to_cashier}</li>
              </ul>
          </div>
        </div>
      </main>
      <footer className='footer'>
        <Footer/>
      </footer>
    </div>

  )
}
