
import React, {useEffect, useState} from 'react'
import Position from './Position';
import { useLocalStorage } from '../../../public/static/useLocalStorage';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';
import PhoneCallLogo from '../../../public/static/icons/PhoneCallLogo'
import LocationLogo from '../../../public/static/icons/LocationLogo'
import ClientLogo from '../../../public/static/icons/ClientLogo'
import MetroLogo from '../../../public/static/icons/MetroLogo'
import ClockLogo from '../../../public/static/icons/ClockLogo'
import CheckMarkLogo from '../../../public/static/icons/CheckMarkLogo'
import CrossLogo from '../../../public/static/icons/CrossLogo'


export default function Order(props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const [mainButtonClicked, setMainButtonClicked] = useState(false);
  const [adress_yandex_map, setAdressurl] = useState('');
  const [paid, setPaid] = useState('');
  const [extra, setExtra] = useState();
  const [order_style, setOrderStyle] = useState('m-2 flex flex-col font-medium rounded-lg p-3 section');
  const [order_id, setOrderId] = useState();
  const [phone, setPhone] = useState('');
  const [data, setData] = useState({});
  const [positions, setPositions] = useState([]);

  
  const [order_price, setOrderPrice] = useState();
  const [order_amount, setOrderAmount] = useState();




  const fetchData = async () => {
    setData(props.input_data);
    setPositions(props.positions);
    setAdressurl(`https://yandex.ru/maps/?text=${props.input_data.adress}`);
    setPhone(`tel:${props.input_data.phone_number}`);
    setOrderId(props.input_data.order_id);
    if(data.paid == false){
      setPaid('Доплатить: ');
      setExtra(data.extra);
    }
    else if(data.paid == true){
      setPaid('Оплачено');
    }
    
  }

  useEffect(() => {
      if(positions){
      const listenStorageChange = () => {
        var order_price_tmp = 0;
        var order_amount_tmp = 0;
        positions.forEach(      
          (pos) => {
              if(useLocalStorage(`${order_id}/${pos.id}`).getItem()){
                var pos_price = useLocalStorage(`${order_id}/${pos.id}`).getItem().price
                var pos_amount = parseInt(useLocalStorage(`${order_id}/${pos.id}`).getItem().amount)
  
                order_price_tmp += pos_price;
                order_amount_tmp += pos_amount;
              }
              
          }
        );
        setOrderPrice(order_price_tmp);
        setOrderAmount(order_amount_tmp);
      }
      window.addEventListener("storage", listenStorageChange);
      return () => window.removeEventListener("storage", listenStorageChange);
    }

      
  }, [positions, order_amount, order_price])

  useEffect(() => {
    fetchData()
  }, [])


  const handleClickCloseOrder = async () => {
    if(mainButtonClicked){
      function callback(flag) {
        if(flag){
          setOrderStyle('hidden');
          props.positions.forEach(      
            (pos) => {
              useLocalStorage(`${data.order_id}/${pos.id}`).removeItem();
            }
          );
          window.dispatchEvent(new Event("storage"));
          router.replace(`?mainButtonClicked=false`,undefined, {scroll: false})
        }
      }
      window.Telegram.WebApp.showConfirm('Вы уверены? \nВы вносите изменения после подсчета!', callback)
    }
    else{
      setOrderStyle('hidden');
      props.positions.forEach(      
        (pos) => {
          useLocalStorage(`${data.order_id}/${pos.id}`).removeItem();
        }
      );
      window.dispatchEvent(new Event("storage"));
    }
  }
  useEffect(() => {
    if(searchParams.get('mainButtonClicked') === 'true'){
      setMainButtonClicked(true);

    }
    else if(searchParams.get('mainButtonClicked') === 'false'){
      setMainButtonClicked(false);
    }

  }, [pathname, searchParams, router])

  return (
  <div className={order_style}>
    <div className='flex justify-between'>
      <h1 className=' text-xl'>Заказ: {data.order_id}</h1>
      <button type="button" onClick={handleClickCloseOrder} class="rounded-md inline-flex items-center justify-center cross-image">
              <span class="sr-only">Close menu</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M 6 18 L 18 6 M 6 6 l 12 12" />
              </svg>
      </button>
    </div>
    <ul className='mt-3'>
      <li key={'additional_contacts'} className="w-full ">Доп. контакты: {data.additional_contacts}</li>

      <li key={'adress'} className="w-full ">
        <div className='flex'>
          <LocationLogo/>
          <a className=' link' href={adress_yandex_map}>Адрес: {data.adress}</a>
        </div>
      </li>
      <li key={'paid'} className="w-full ">
        {paid === 'Оплачено' ? (
          <div className='flex'>
            <CheckMarkLogo/>
            <p>{paid}{extra}</p>
          </div> 
        ) : 
        (
          <div className='flex'>
            <CrossLogo/>
            <p>{paid}{extra}</p>
          </div>
        )}

      </li>
      <li key={'customer'} className="w-full ">
        <div className='flex '>
          <ClientLogo/>
          <p>Клиент: {data.customer}</p>
        </div>


      </li>
      <li key={'metro'} className="w-full ">
        <div className='flex'>
          <MetroLogo/>
          <p>Метро: {data.metro}</p>
        </div>
      </li>
      <li key={'phone_number'} className="w-full ">
        <div className='flex'>
          <PhoneCallLogo/>
          <a href={phone}>{data.phone_number}</a>
        </div>
      </li>
      <li key={'tovar_arrival_time'} className="w-full ">
        <div className='flex'>
          <ClockLogo/>
          <p>время доставки: {data.tovar_arrival_time}</p>
        </div>
        
      </li>
      <li key={'positions'} className="w-full ">
        {positions.length > 0 ? (  
          <div>
            {positions.map(d => (
                <Position
                  id = {d.id}
                  order_id = {data.order_id}
                  name = {d.name}
                  amount = {d.amount}
                  price = {d.price}
                  key = {d.id}
                />
              ))}
              </div>
            ) : (
                "Loading..."
            )}

      </li>
      <li className="w-full ">
        <div>
          <div>
            <h1>Итого</h1>
          </div>
          <ul className='grid grid-cols-4 gap-4'>
           <li className='inline'>
              <p>{order_amount}</p>
            </li>
            <li className='inline'>
              <p>{order_price}</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  )
}





