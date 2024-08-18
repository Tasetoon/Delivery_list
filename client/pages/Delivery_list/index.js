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
    router.replace(`?mainButtonClicked=false`,{}, {scroll: false})
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
      if(searchParams.get('mainButtonClicked') === 'true'){
        window.Telegram.WebApp.MainButton.hide();
        setStyle('m-10 flex');

      }
      else if(searchParams.get('mainButtonClicked') === 'false'){
        window.Telegram.WebApp.MainButton.show();
        setStyle('hidden');
      }

    }, [searchParams, router, pathname])

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
    window.dispatchEvent(new Event("storage"));
    router.replace(`?mainButtonClicked=true#result`,{}, {scroll: false})
  }
  return (
    <div className='wrapper'>
      <header className='header flex justify-center pt-10'>
        <Script src='/static/telegram-web-app.js' strategy='beforeInteractive'></Script>
        <div id='test' className='text-center '>
          <h1 className='text-9xl'>📋</h1>
          <h1 className='m-5 text-4xl'>Маршрутный Лист</h1>
          <h1 className='text-4xl subtitle-text'>@{user_id ? user_id : 'user_id'}</h1>
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
          <button type='button' onClick={handleClickRefresh} className='py-2.5 pl-4 group pr-3.5 text-sm refresh-button rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 flex gap-2 items-center'>
            Обновить
            <svg class="transition-all duration-700 group-hover:animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18.6793 11.776C18.6793 12.2186 19.0381 12.5774 19.4807 12.5774C19.9233 12.5774 20.2821 12.2186 20.2821 11.776H18.6793ZM3.75105 8.55933C3.58499 8.96958 3.78294 9.43677 4.19319 9.60283C4.60344 9.7689 5.07063 9.57095 5.23669 9.1607L3.75105 8.55933ZM5.3214 12.224C5.3214 11.7814 4.96261 11.4226 4.52003 11.4226C4.07744 11.4226 3.71866 11.7814 3.71866 12.224H5.3214ZM20.2497 15.4407C20.4157 15.0304 20.2178 14.5632 19.8075 14.3972C19.3973 14.2311 18.9301 14.4291 18.764 14.8393L20.2497 15.4407ZM19.5043 11.7988L19.0401 12.452C19.4009 12.7084 19.9012 12.6237 20.1575 12.2629L19.5043 11.7988ZM17.0297 9.0573C16.669 8.80094 16.1687 8.88558 15.9123 9.24636C15.656 9.60713 15.7406 10.1074 16.1014 10.3638L17.0297 9.0573ZM22.2457 9.32421C22.5021 8.96344 22.4175 8.46315 22.0567 8.20679C21.6959 7.95042 21.1956 8.03507 20.9393 8.39584L22.2457 9.32421ZM4.49642 12.2012L4.9606 11.548C4.59983 11.2916 4.09954 11.3763 3.84318 11.7371L4.49642 12.2012ZM6.97097 14.9427C7.33174 15.1991 7.83203 15.1144 8.08839 14.7536C8.34475 14.3929 8.26011 13.8926 7.89933 13.6362L6.97097 14.9427ZM1.75496 14.6758C1.4986 15.0366 1.58324 15.5369 1.94402 15.7932C2.30479 16.0496 2.80508 15.9649 3.06145 15.6042L1.75496 14.6758ZM11.7047 4.80137C15.5567 4.80137 18.6793 7.92403 18.6793 11.776H20.2821C20.2821 7.03886 16.4418 3.19863 11.7047 3.19863V4.80137ZM5.23669 9.1607C6.27196 6.60316 8.77885 4.80137 11.7047 4.80137V3.19863C8.10371 3.19863 5.02289 5.41737 3.75105 8.55933L5.23669 9.1607ZM12.2961 19.1986C8.44406 19.1986 5.3214 16.076 5.3214 12.224H3.71866C3.71866 16.9611 7.55889 20.8014 12.2961 20.8014V19.1986ZM18.764 14.8393C17.7288 17.3968 15.2219 19.1986 12.2961 19.1986V20.8014C15.897 20.8014 18.9778 18.5826 20.2497 15.4407L18.764 14.8393ZM19.9685 11.1455L17.0297 9.0573L16.1014 10.3638L19.0401 12.452L19.9685 11.1455ZM20.9393 8.39584L18.851 11.3346L20.1575 12.2629L22.2457 9.32421L20.9393 8.39584ZM4.03224 12.8545L6.97097 14.9427L7.89933 13.6362L4.9606 11.548L4.03224 12.8545ZM3.06145 15.6042L5.14966 12.6654L3.84318 11.7371L1.75496 14.6758L3.06145 15.6042Z" fill="currentcolor" />
            </svg>
          </button>
            {/* <img className=' max-w-10' onClick={handleClickRefresh} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEIklEQVR4nO1avW8cRRSfEMBEICCJ+CgooCOYj7RUqSAHF7Pz+62mAIxSEAJNQiC0wdQQgRQJCSH+AiQakPlUIlEQAYFACogxTsVHgQJd7H1zwERvb9baHD7sO9+tdyE/aaRb7dybefPevM815jL+owjObctIK+QrAsx6YE7IPwQQAbz+9sC8kO8LcFTnBmu3mzog7N17jZBPCPmxAH95MgwyhOwI8KGk6XRw7urqGXBuiycPC/lraVOZACc8cERPO7N2R2i3t4b9+6/KR7u9NXPurszaRICXhDyu0ir9X2kdDq3WRCVMdIC2B84tbwA4JcC+4NwNg9JS5vS/nvxmWVLAuQ75cO9cDxy6ANw2KjV6o6QaX3fS9EEzInTI3R44E6Xztyff1DX1XWYtVXUFcOtjwrlbdeNxkQseOBCc2zwqJkrrbPbk8wIsxbW+yAAIsBifXx2a+JJzd3hyIYr9rAB3mzFDkuSesvqW7tHJ9UhioSCiJtZUhIy8U4A/exjJBjYGqp8ldToZpqevHduue9d2bouuuaLZtvb+gYgtX2zgbJWSCDMzV3jynb7+B3huMBMbL3YVd6IMIV9bxZG+vXZnV1w04MDYd967fqt1vaTppJpjIZ9U5+mBtzQC8MB3OtZEyAMvFH5iHCa2EoRWa8KTvygjHeAB01RImk4XYYdpMgT4JDKyzzQVwblt6oBypzNEAFgbZACiyT1umgwBjkaTe8Q0GaLpKRky4BHTZHhgPmfE2h2myRDgd2WkyrhqLJCYP29IEeD/ykjoRiB5ftJo1QrO3RQd92+NvuySppPRVcz1N7/WJqbmyKxlZOTd/g6RfNHUHKI5Sle1Xv7HS60OxpcnTM0hwKd5qmHtnn5Vv27QmCQ3mnoHt6J1Y80mV5wkwEe5VKx9ytQU3tpnoubM9p0kwOPxnnxlaohgzCYPnM4ZSdNH/93RAD/n+kfuNjVDx9o98aB/WrVQp7XXaNpO16n4EHbturIocnvg4ForjN1aL/msqQl8ccDkD2sum3asfSheqEVJ03vNBkOSZGdRoR+4lSHk68snsIG9vqBxFfBjDBKPDdfYAU5FyXxeZRG7QHDuOu2RFL2Sodty8TTmIqEv9XkoQsM7vs+iViyEqalb1kUwb/RE0aqaCXCfqeBO+GJNYH4pSW4fCWE9jZKaLWpjUs3hSIj3mlhe2noLwM2jXaTbDC0MgI5v1bqNhLYxm2K3+EypO3VsrK3qDtAqqVpetffA0xp0DnMP8tgphh0+qtIou8WrO03gUBHORJWTGF7P5J3YNJ1Us601gHxYu12bRjEpmtG55Q8GNOzwwMHKPhi4hKFWa0LIx4T8oLdxOcAnHLMaAG4IAytBC98ZOaVZm5Dv5a1s8nyUlOYP5z35vaanOkfn9s0nLsM0HxcBvgvbmsWxKnEAAAAASUVORK5CYII="/> */}
          </div>

        </div>
      </main>
    </div>

  )
}
