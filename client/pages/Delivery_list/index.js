import React, {useEffect, useStatem, useRef, useState} from 'react'
import Router from 'next/router'
import Order from './components/Order'
import Script from 'next/script';


const _data ={
  'orders': [{
          "order_id": 98783,
          "adress": "Горбушка",
          "additional_contacts": "ПОЗВОНИТЬ ЗА ЧАС",
          "paid": true,
          "extra": NaN,
          "customer": "Alex",
          "phone_number": "878374873",
          "metro": "(7)China-town",
          "tovar_arrival_time": "17-22",
          "positions": [{
              "id": 1,
              "name": "ljjeljfle",
              "amount": 2,
              "price": 22000
          },
          {
              "id": 2,
              "name": "ksjdj",
              "amount": 1,
              "price": 1000
          },
          {
              "id": 3,
              "name": "ejfelj",
              "amount": 1,
              "price": 1000
          },
          {
              "id": 4,
              "name": "ppi",
              "amount": 1,
              "price": 1000
          },
          {
              "id": 5,
              "name": "oiglhv",
              "amount": 1,
              "price": 1000
          },
          {
              "id": 6,
              "name": "Доставка",
              "amount": 1,
              "price": 1000
          }
          ]
      },
      {
          "order_id": 123,
          "adress": "Ленинский проспект",
          "additional_contacts": "ПОЗВОНИТЬ ЗА ЧАС",
          "paid": false,
          "extra": 9900,
          "customer": "Mike",
          "phone_number": "+79163874752",
          "metro": "(3)Leninskiy prospekt",
          "tovar_arrival_time": "13-17",
          "positions": [{
              "id": 1,
              "name": "ljjeljfle",
              "amount": 2,
              "price": 22000
          },
          {
              "id": 2,
              "name": "Доставка",
              "amount": 1,
              "price": 1000
          }]
      }],
      'total_price': 50000,
      'delivery_price': 10000,
      'to_cashier': 40000
}



export default function index() {
  const [data, setData] = useState([]);
  const [total_price, setTotal] = useState();
  const [delivery_price, setDelivery] = useState();
  const [to_cashier, setCashier] = useState();
  const [style, setStyle] = useState('hidden');


  useEffect(() => {
      window.Telegram.WebApp.BackButton.show()
      window.Telegram.WebApp.setHeaderColor('secondary_bg_color');
      window.Telegram.WebApp.setBackgroundColor('secondary_bg_color');
      window.Telegram.WebApp.onEvent('backButtonClicked', () => {
        window.Telegram.WebApp.BackButton.hide();
        Router.back();
      })
    }, [])


  useEffect(() => {
    setData(_data.orders);
    setTotal(_data.total_price);
    setDelivery(_data.delivery_price);
    setCashier(_data.to_cashier);
  // fetch('http://5.42.220.196/orders')
  //           .then((response) => response.json())  
  //           .then((data) => {
  //               setData(data.orders);
  //               setTotal(data.total_price);
  //               setDelivery(data.delivery_price);
  //               setCashier(data.to_cashier);       
  //     })

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
      <header className='header flex justify-center pt-10'>
        <Script src='/static/telegram-web-app.js' strategy='beforeInteractive'></Script>
        <div className='text-center '>
          <h1 className='text-9xl'>📋</h1>
          <h1 className='m-5'>Маршрутный Лист</h1>
        </div>
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
                <h1 className='text-center font-extrabold '>Loading...</h1>
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
    </div>

  )
}
