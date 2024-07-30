
import React, {useEffect, useState} from 'react'
import Position from './Position';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Order(props) {
  const [adress_yandex_map, setAdressurl] = useState('');
  const [paid, setPaid] = useState('');
  const [extra, setExtra] = useState('');
  const [order_style, setOrderStyle] = useState('m-2 flex flex-col font-medium rounded-lg p-3 section');
  const [phone, setPhone] = useState('');
  const [data, setData] = useState({});
  const [positions, setPositions] = useState([]);

  const [order_total_price, setOrderTotalPrice] = useState();
  const [order_delivery_price, setOrderDeliveryPrice] = useState();


  const searchParams = useSearchParams();
  const total_price = searchParams.get("total_price");
  const delivery_price = searchParams.get("delivery_price");
  // const deleted = searchParams.get('deleted')


  const fetchData = async () => {
    setData(props.input_data);
    setPositions(props.positions);
    setAdressurl(`https://yandex.ru/maps/?text=${props.input_data.adress}`);
    setPhone(`tel:${props.input_data.phone_number}`);
    if(data.paid == false){
      setPaid('Доплатить: ');
      setExtra(data.extra);
    }
    else if(data.paid == true){
      setPaid('Оплачено');
    }    
  }

  useEffect(() => {
    var order_price_tmp = 0;
    var order_delivery_tmp = 0;
    props.positions.forEach(      
      (pos) => {
        if(searchParams.get(`deleted${data.order_id}`) !== pos.id){
          if(pos.name !== 'Доставка'){
            order_price_tmp += (pos.amount * pos.price);
          }
          else{
            order_delivery_tmp += pos.price;
          }
        }
      }
    );
    setOrderTotalPrice(order_price_tmp);
    setOrderDeliveryPrice(order_delivery_tmp);

  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const handleClickCloseOrder = async (e) => {
    setOrderStyle('hidden');
  }

  const handleClickOpenLink = async () => {
    window.Telegram.WebApp.openLink(`${adress_yandex_map}`[try_instant_view=true]);
  }

  return (
  <div className={order_style}>
    <div className='flex justify-between'>
      <h1 className=' text-xl'>Номер заказа: {data.order_id}</h1>
      <Link 
        href={
          `?total_price=${total_price-order_total_price}&delivery_price=${delivery_price-order_delivery_price}`
        }
        replace
        scroll={false}
      > 
        <img onClick={handleClickCloseOrder} className='cross_img self-end' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADuUlEQVR4nO2dPW8TQRCGLRD8GNrkNqHkxk6HCB+GAiWiQUQp+QN0iEAqGgpKIpD4RmkQSp0SSgzhQ0ABSgQSufGikMSL1o4FsnDss293ZtfzStPGmee5vd27tbylkkQikUgkEolEIpFIJBKJRJIjpnrkcAbj5xCSuwiqlqUKEZSJqbJWTzXbY1ZOztqeWVwkmzBxOkvVe2pA6L/ebZbHT5GBN9XqQQS1yACEIR0ZkNwwV0oHvAsQ+OpfCQvebzvUVx4yq3qqpr3At5OPvf9RN4zMKkuTD14m5tZqh75hZFhZqqrOBSAk96gbRa6VqiX3AtLkLXmjwLZq7gVAkjFo1PCsJPMggLpJxbpEAIgA8qsQZQTQg0C5BdHDQIIKcg6oT5cNVibJ4Y2kgPrJKbP78pXZXn5mcOqoF0h6bqZZIy+gvgffbPxolg8J+uJ50/j42TQ+fTF6bnZ0R0AnfONBQht++7NcSAhCQDf4xqGETviuJLAX0Au+cSChG3wXEtgL+H37Vk/4pi3h6eOhV0e94Bctgb0AC3T70YP+JSwPPhL6hf9XwMwICPAkQRPAD0eAYwmaCH5YAhxJ0ITwwxMAxUqghh+mAChGAgf44QqA4SRwgR+2ABhMgr40ywZ++AIgvwTzdZ0N/DgEwAASmMCPRwAUJ8En/LgEwPASfMOPTwAMLoECfpwCoCVh58Xz/gV82zB6/oL//zNWATrHOv9/zwkiwDN8QyghqhGgh4BPJSEaAboA+BQSohCgC4TvW0LwAnTOF2t5Vkc+JAQtQA/yVrP5nHCfjYRgBehhXikzkhCkAF3E+3wmEoIToIvcTGEgISgB2sVOFrGEYAQ43Uas0EkIQoCXPdwKjQT2ArxuoFcmzfaTh/m+i1qeiFvAzsqKH/iQfyRs3VyMfwTUjx8zu6urfuBD/xKKgB+EgF4SGq52svaRUBT8YAR0k9BwvY3YKWH9u9lavFroZwQjoFNCw9cebluCA/jBCcA9CXZi9rqBXpk0vy7PO/nbwQnAyEoEgAggvwpRRgA9CJRbED0MJCiZAyB6AfKjfdhNQJr8dC8gVW+orzLkWql67V5A64wA+maBZd1xLsAeXsCgUcOxNlN1xrkAMzZ2CCFZo24WmZU9xMLbqRr25AjqhpFZ1UGdKPmMPTmCumlkUhmoayXfscd2ZGlynbp5JIefLJAcYdKOPTliNOeEZM37bWe/idkeXmB/P9+uheN8WEuyZm+pWrKrHdszNXeJRCKRSCQSiUQikUgkEkkpqPwBvH5Rt06PIP8AAAAASUVORK5CYII="></img>
      </Link>
    </div>
    <ul className='mt-3'>
      <li key={'additional_contacts'} className="w-full ">Доп. контакты: {data.additional_contacts}</li>

      <li key={'adress'} className="w-full ">
            <a onClick={handleClickOpenLink}>Адрес: {data.adress}</a>
      </li>
      <li key={'paid'} className="w-full ">{paid}{extra}</li>
      <li key={'customer'} className="w-full ">клиент: {data.customer}</li>
      <li key={'metro'} className="w-full ">метро: {data.metro}</li>
      <li key={'phone_number'} className="w-full ">
        <a href={phone}>{data.phone_number}</a>
      </li>
      <li key={'tovar_arrival_time'} className="w-full ">время доставки: {data.tovar_arrival_time}</li>
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
    </ul>
  </div>
  )
}





