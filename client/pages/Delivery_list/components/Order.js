
import React, {useEffect, useState} from 'react'
import Position from './Position';
import { useLocalStorage } from '../../../public/static/useLocalStorage';

export default function Order(props) {

  const [adress_yandex_map, setAdressurl] = useState('');
  const [paid, setPaid] = useState('');
  const [extra, setExtra] = useState('');
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
    setOrderStyle('hidden');
    props.positions.forEach(      
      (pos) => {
        useLocalStorage(`${data.order_id}/${pos.id}`).removeItem();
      }
    );
    window.dispatchEvent(new Event("storage"));



  }

  return (
  <div className={order_style}>
    <div className='flex justify-between'>
      <h1 className=' text-xl'>Номер заказа: {data.order_id}</h1>
      <img onClick={handleClickCloseOrder} className='cross_img self-end' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADuUlEQVR4nO2dPW8TQRCGLRD8GNrkNqHkxk6HCB+GAiWiQUQp+QN0iEAqGgpKIpD4RmkQSp0SSgzhQ0ABSgQSufGikMSL1o4FsnDss293ZtfzStPGmee5vd27tbylkkQikUgkEolEIpFIJBKJRJIjpnrkcAbj5xCSuwiqlqUKEZSJqbJWTzXbY1ZOztqeWVwkmzBxOkvVe2pA6L/ebZbHT5GBN9XqQQS1yACEIR0ZkNwwV0oHvAsQ+OpfCQvebzvUVx4yq3qqpr3At5OPvf9RN4zMKkuTD14m5tZqh75hZFhZqqrOBSAk96gbRa6VqiX3AtLkLXmjwLZq7gVAkjFo1PCsJPMggLpJxbpEAIgA8qsQZQTQg0C5BdHDQIIKcg6oT5cNVibJ4Y2kgPrJKbP78pXZXn5mcOqoF0h6bqZZIy+gvgffbPxolg8J+uJ50/j42TQ+fTF6bnZ0R0AnfONBQht++7NcSAhCQDf4xqGETviuJLAX0Au+cSChG3wXEtgL+H37Vk/4pi3h6eOhV0e94Bctgb0AC3T70YP+JSwPPhL6hf9XwMwICPAkQRPAD0eAYwmaCH5YAhxJ0ITwwxMAxUqghh+mAChGAgf44QqA4SRwgR+2ABhMgr40ywZ++AIgvwTzdZ0N/DgEwAASmMCPRwAUJ8En/LgEwPASfMOPTwAMLoECfpwCoCVh58Xz/gV82zB6/oL//zNWATrHOv9/zwkiwDN8QyghqhGgh4BPJSEaAboA+BQSohCgC4TvW0LwAnTOF2t5Vkc+JAQtQA/yVrP5nHCfjYRgBehhXikzkhCkAF3E+3wmEoIToIvcTGEgISgB2sVOFrGEYAQ43Uas0EkIQoCXPdwKjQT2ArxuoFcmzfaTh/m+i1qeiFvAzsqKH/iQfyRs3VyMfwTUjx8zu6urfuBD/xKKgB+EgF4SGq52svaRUBT8YAR0k9BwvY3YKWH9u9lavFroZwQjoFNCw9cebluCA/jBCcA9CXZi9rqBXpk0vy7PO/nbwQnAyEoEgAggvwpRRgA9CJRbED0MJCiZAyB6AfKjfdhNQJr8dC8gVW+orzLkWql67V5A64wA+maBZd1xLsAeXsCgUcOxNlN1xrkAMzZ2CCFZo24WmZU9xMLbqRr25AjqhpFZ1UGdKPmMPTmCumlkUhmoayXfscd2ZGlynbp5JIefLJAcYdKOPTliNOeEZM37bWe/idkeXmB/P9+uheN8WEuyZm+pWrKrHdszNXeJRCKRSCQSiUQikUgkEkkpqPwBvH5Rt06PIP8AAAAASUVORK5CYII="></img>
    </div>
    <ul className='mt-3'>
      <li key={'additional_contacts'} className="w-full ">Доп. контакты: {data.additional_contacts}</li>

      <li key={'adress'} className="w-full ">
            <a className=' link' href={adress_yandex_map}>Адрес: {data.adress}</a>
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
                  main_btn = {props.main_btn}
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





