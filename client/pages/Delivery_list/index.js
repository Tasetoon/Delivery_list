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
      const tg = window.Telegram.WebApp;
      tg.MainButton.show();
      tg.MainButton.setText('Посчитать меня');
      tg.onEvent('mainButtonClicked', handleClickResult)

      tg.BackButton.show()
      tg.setHeaderColor('secondary_bg_color');
      tg.setBackgroundColor('secondary_bg_color');
      tg.onEvent('backButtonClicked', () => {
        tg.BackButton.hide();
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
          <div className='m-10 mb-3 flex justify-center'>
            <img onClick={handleClickRefresh} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEAklEQVR4nO2aS48UVRTHf4o6Gs0MdN1TTQyJmszCt279AIoPUCFxgeJKiG5ARLeIayWakJgY4ycwcaMZnwHDwokK8kr3PTXlTEh4LYy6E0XUNmfq1kxFZobuprumSvgnN6lJ3zm3/ueee+55FFzF/xQtRhtt4qc97i1FJjySKPKrIucV+TM8px751CN7srm3RlQBJ7jtxjbyvOK+9MjfinR6HBc87vOEeHMLbiidwEnW3KRErypyNn8pj/vDI/s9bpdpe4rGXccZW3UIrrdhzy0adyfETynyhkf2hd3KSZ01mSnjI6WQ8LgnPG5mnoAc9LgtM6wa61WWkbP/VdyRgkJm2rjHF1h3R0pjzUDMyCPvFTT4g0ceYUBQZK3HHQvK+UeR921N+80jG810E+SZy1qkhay2F88IuN8U2daBFQwYHVjhcTs97vdA6DtPvMHjzgXlvd238ITmHR43HQSrp3kvQ4YS31c03/nhJvveiZyECTEXS0lIiO70yF9FIuZQenYGZp8Fc5o8SvNmSvWKbnIhl+2JH+pJWH6wzZzK3IkOXKu4jxa7ezzulZ5cbH6wyzgTRSjyzlKXqEc+7HpbCwdtGyUjpTHapnmPueM27gW7PBX5wCIARdo2uhKkyGv5PTEMF1sKUsZHPHImHKqHqSsS4s152EGdobivgmfYQl3RYrRhF5BdOv0EgJWBJ94QzGofdYZH9gSz2kWdochE5najJ6kzFEmNiGV21BmK/GJEyoyrhgIN+fOyFAGuVCIp4yN5flJr00pZLYHIT7U+7O0sOrY7L1nU/VrdiYrDIxsDkY+XuhBfp+LQLEexd33zoh+tOhhY7qfiUORAILJukapfFjQeYWwlFUWL0UbwsBcsm1xwkuK+CEy3UlEo8Ushg51YYlL0XJh0iAqiA9cocjgoe9OlUt3TgcxaKgaPWxfO8alLFuqs9hqIHK5S8eFruC4vcitue5dV97ky6ctUBH5ewVNdl00T3GPBDs8lxPezzGghDxYq9L21MhT3bq6B5ez1pbNxlfsxKHZvv42dg8HEvi2ziJ2jhdxiPZK8V9J3W860EbqzJuh7+5tSqzrum7AT08eJm5cl0Bo9+daamU0hD1DCmdD5NVOleftABJs2cjMzB2CNSXOHDMfF7iy23qZpxgNdJGv8zDkAI3TUvNugbuzQLT5WkL93qK3qBHm0sO2zVXsletGCzv4CwNnYaTbs0GBKg+wWd3Np7iiEM50QkR7wuN1WtbQszty21QBs2LM1jbJWs9sdQvG5DwYs7FDc9tI+GLi4CBA963Gf/bdx2e0nHNl3K27TshBYCFb4VqL1lrUp8on1HhX3c9D6eXv2iLf0NJsTrV80n7gK6o9/AeZcqmLW7fdPAAAAAElFTkSuQmCC"></img>
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
