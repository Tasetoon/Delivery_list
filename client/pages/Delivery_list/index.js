import React, {useEffect, useStatem, useRef, useState} from 'react'
import Router from 'next/router'
import Order from './components/Order'
import Script from 'next/script';
import { useLocalStorage } from '../../public/static/useLocalStorage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
      }]
}



export default function index() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState([]);
  const [total_price, setTotal] = useState();
  const [user_id, setUserId] = useState('');
  const [delivery_price, setDelivery] = useState();
  const [style, setStyle] = useState('hidden');



  const fetchData = async () => {
    setData(_data.orders); 
  }

  
  useEffect(() => {
    if(data){
    const listenStorageChange = () => {
      var total_price_tmp = 0;
      var total_delivery_tmp = 0;

      data.forEach(
        (order) => {
          order.positions.forEach(      
            (pos) => {
                if(useLocalStorage(`${order.order_id}/${pos.id}`).getItem()){
                  var item = useLocalStorage(`${order.order_id}/${pos.id}`).getItem()
                  if(item.is_delivery){
                    total_delivery_tmp += item.price
                  }
                  else{
                    total_price_tmp += item.price
                  }
                }
            }
          );
        }
      )
        


      setTotal(total_price_tmp);
      setDelivery(total_delivery_tmp);
    }
    window.addEventListener("storage", listenStorageChange);
    return () => window.removeEventListener("storage", listenStorageChange);
    }

    
}, [data, total_price, delivery_price])

  useEffect(() => {
    fetchData()
  }, [data]);

  useEffect(() => {
      const tg = window.Telegram.WebApp;
      tg.MainButton.setText('Посчитать меня');
      tg.onEvent('mainButtonClicked', handleClickResult)
      tg.BackButton.show()
      tg.setHeaderColor('secondary_bg_color');
      tg.setBackgroundColor('secondary_bg_color');
      tg.onEvent('backButtonClicked', () => {
        tg.BackButton.hide();
        tg.MainButton.hide();
        Router.back();
      })
      tg.initDataUnsafe.user ? setUserId(tg.initDataUnsafe.user.username) : null;
      
    }, []);
  
    useEffect(() => {
      searchParams.get('mainButtonClicked') ?

      window.Telegram.WebApp.MainButton.hide() :

      window.Telegram.WebApp.MainButton.show();

    }, [])

  // useEffect(() => {
  // fetch('http://5.42.220.196/orders')
  //           .then((response) => response.json())  
  //           .then((data) => {
  //               setData(data.orders);
  //               setTotal(data.total_price);
  //               setDelivery(data.delivery_price);
  //               setCashier(data.to_cashier);       
  //     })
  // }, []);


  const handleClickRefresh = async () => {
    function callback(flag) {
      if(flag) Router.reload();
    }
    window.Telegram.WebApp.showConfirm('Вы уверены? \nЭто сбросит все изменения', callback)
  
  }

  const handleClickResult = async () => {
    window.Telegram.WebApp.MainButton.hide();
    setStyle('m-10 flex');
    window.dispatchEvent(new Event("storage"));
    router.replace({
      pathname: '#result',
      query: {mainButtonClicked: true},
    }) 

  }
  return (
    <div className='wrapper'>
      <header className='header flex justify-center pt-10'>
        <Script src='/static/telegram-web-app.js' strategy='beforeInteractive'></Script>
        <div className='text-center '>
          <h1 className='text-9xl'>📋</h1>
          <h1 className='m-5'>Маршрутный Лист для @{user_id}</h1>
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
                    key = {order.order_id}
                  />
                ))}
            </div>
              ) : (
                <h1 className='text-center font-extrabold '>Loading...</h1>
              )}
          </div>
          
          <div id='result' className={style}>
            
              <ul>
                <li key={'total_price'} className='w-full border-b'>Общая сумма - {total_price}</li>
                <li key={'delivery_price'} className='w-full border-b'>Сумма за доставки - {delivery_price}</li>
                <li key={'to_cashier'} className='w-full border-b '>Вы должны отдать - {total_price - delivery_price}</li>
              </ul>
          </div>
          <div className='m-10 mb-3 flex justify-center'>
            <img className=' max-w-10' onClick={handleClickRefresh} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEIklEQVR4nO1avW8cRRSfEMBEICCJ+CgooCOYj7RUqSAHF7Pz+62mAIxSEAJNQiC0wdQQgRQJCSH+AiQakPlUIlEQAYFACogxTsVHgQJd7H1zwERvb9baHD7sO9+tdyE/aaRb7dybefPevM815jL+owjObctIK+QrAsx6YE7IPwQQAbz+9sC8kO8LcFTnBmu3mzog7N17jZBPCPmxAH95MgwyhOwI8KGk6XRw7urqGXBuiycPC/lraVOZACc8cERPO7N2R2i3t4b9+6/KR7u9NXPurszaRICXhDyu0ir9X2kdDq3WRCVMdIC2B84tbwA4JcC+4NwNg9JS5vS/nvxmWVLAuQ75cO9cDxy6ANw2KjV6o6QaX3fS9EEzInTI3R44E6Xztyff1DX1XWYtVXUFcOtjwrlbdeNxkQseOBCc2zwqJkrrbPbk8wIsxbW+yAAIsBifXx2a+JJzd3hyIYr9rAB3mzFDkuSesvqW7tHJ9UhioSCiJtZUhIy8U4A/exjJBjYGqp8ldToZpqevHduue9d2bouuuaLZtvb+gYgtX2zgbJWSCDMzV3jynb7+B3huMBMbL3YVd6IMIV9bxZG+vXZnV1w04MDYd967fqt1vaTppJpjIZ9U5+mBtzQC8MB3OtZEyAMvFH5iHCa2EoRWa8KTvygjHeAB01RImk4XYYdpMgT4JDKyzzQVwblt6oBypzNEAFgbZACiyT1umgwBjkaTe8Q0GaLpKRky4BHTZHhgPmfE2h2myRDgd2WkyrhqLJCYP29IEeD/ykjoRiB5ftJo1QrO3RQd92+NvuySppPRVcz1N7/WJqbmyKxlZOTd/g6RfNHUHKI5Sle1Xv7HS60OxpcnTM0hwKd5qmHtnn5Vv27QmCQ3mnoHt6J1Y80mV5wkwEe5VKx9ytQU3tpnoubM9p0kwOPxnnxlaohgzCYPnM4ZSdNH/93RAD/n+kfuNjVDx9o98aB/WrVQp7XXaNpO16n4EHbturIocnvg4ForjN1aL/msqQl8ccDkD2sum3asfSheqEVJ03vNBkOSZGdRoR+4lSHk68snsIG9vqBxFfBjDBKPDdfYAU5FyXxeZRG7QHDuOu2RFL2Sodty8TTmIqEv9XkoQsM7vs+iViyEqalb1kUwb/RE0aqaCXCfqeBO+GJNYH4pSW4fCWE9jZKaLWpjUs3hSIj3mlhe2noLwM2jXaTbDC0MgI5v1bqNhLYxm2K3+EypO3VsrK3qDtAqqVpetffA0xp0DnMP8tgphh0+qtIou8WrO03gUBHORJWTGF7P5J3YNJ1Us601gHxYu12bRjEpmtG55Q8GNOzwwMHKPhi4hKFWa0LIx4T8oLdxOcAnHLMaAG4IAytBC98ZOaVZm5Dv5a1s8nyUlOYP5z35vaanOkfn9s0nLsM0HxcBvgvbmsWxKnEAAAAASUVORK5CYII="/>
          </div>

        </div>
      </main>
    </div>

  )
}
