import React, {useEffect, useStatem, useRef, useState} from 'react'
import Position from './Position';
export default function Order(props) {
  const [adress_yandex_map, setAdressurl] = useState('');
  const [paid, setPaid] = useState('');
  const [extra, setExtra] = useState('');
  const [order_style, setOrderStyle] = useState('m-2 flex flex-col width text font-medium rounded-lg bg-zinc-700 border-gray-900 text-white p-3');
  const [phone, setPhone] = useState('');
  const [data, setData] = useState({});
  const [positions, setPositions] = useState([]);

  const fetchData = async () => {
    setData(props.input_data);
    setPositions(props.positions);
    setAdressurl(`https://yandex.ru/maps/?text=${props.input_data.adress}`);
    setPhone(`tel:${props.input_data.phone_number}`)
    if(data.paid == false){
      setPaid('Доплатить: ');
      setExtra(data.extra);
    }
    else if(data.paid == true){
      setPaid('Оплачено');
    }
}

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if(props.style === 'drop'){
      setOrderStyle('m-2 flex flex-col width text font-medium rounded-lg bg-zinc-700 border-gray-900 text-white p-3')
    }
  }, [])

  const handleClickCloseOrder = async (e) => {
    e.preventDefault()
    setOrderStyle('hidden')
  }

  return (
  <div className={order_style}>
    <div className='flex justify-between'>
      <h1 className=' text-xl'>Номер заказа: {data.order_id}</h1>
      <img className='cross_img self-end' onClick={handleClickCloseOrder} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADuUlEQVR4nO2dPW8TQRCGLRD8GNrkNqHkxk6HCB+GAiWiQUQp+QN0iEAqGgpKIpD4RmkQSp0SSgzhQ0ABSgQSufGikMSL1o4FsnDss293ZtfzStPGmee5vd27tbylkkQikUgkEolEIpFIJBKJRJIjpnrkcAbj5xCSuwiqlqUKEZSJqbJWTzXbY1ZOztqeWVwkmzBxOkvVe2pA6L/ebZbHT5GBN9XqQQS1yACEIR0ZkNwwV0oHvAsQ+OpfCQvebzvUVx4yq3qqpr3At5OPvf9RN4zMKkuTD14m5tZqh75hZFhZqqrOBSAk96gbRa6VqiX3AtLkLXmjwLZq7gVAkjFo1PCsJPMggLpJxbpEAIgA8qsQZQTQg0C5BdHDQIIKcg6oT5cNVibJ4Y2kgPrJKbP78pXZXn5mcOqoF0h6bqZZIy+gvgffbPxolg8J+uJ50/j42TQ+fTF6bnZ0R0AnfONBQht++7NcSAhCQDf4xqGETviuJLAX0Au+cSChG3wXEtgL+H37Vk/4pi3h6eOhV0e94Bctgb0AC3T70YP+JSwPPhL6hf9XwMwICPAkQRPAD0eAYwmaCH5YAhxJ0ITwwxMAxUqghh+mAChGAgf44QqA4SRwgR+2ABhMgr40ywZ++AIgvwTzdZ0N/DgEwAASmMCPRwAUJ8En/LgEwPASfMOPTwAMLoECfpwCoCVh58Xz/gV82zB6/oL//zNWATrHOv9/zwkiwDN8QyghqhGgh4BPJSEaAboA+BQSohCgC4TvW0LwAnTOF2t5Vkc+JAQtQA/yVrP5nHCfjYRgBehhXikzkhCkAF3E+3wmEoIToIvcTGEgISgB2sVOFrGEYAQ43Uas0EkIQoCXPdwKjQT2ArxuoFcmzfaTh/m+i1qeiFvAzsqKH/iQfyRs3VyMfwTUjx8zu6urfuBD/xKKgB+EgF4SGq52svaRUBT8YAR0k9BwvY3YKWH9u9lavFroZwQjoFNCw9cebluCA/jBCcA9CXZi9rqBXpk0vy7PO/nbwQnAyEoEgAggvwpRRgA9CJRbED0MJCiZAyB6AfKjfdhNQJr8dC8gVW+orzLkWql67V5A64wA+maBZd1xLsAeXsCgUcOxNlN1xrkAMzZ2CCFZo24WmZU9xMLbqRr25AjqhpFZ1UGdKPmMPTmCumlkUhmoayXfscd2ZGlynbp5JIefLJAcYdKOPTliNOeEZM37bWe/idkeXmB/P9+uheN8WEuyZm+pWrKrHdszNXeJRCKRSCQSiUQikUgkEkkpqPwBvH5Rt06PIP8AAAAASUVORK5CYII="></img>
    </div>
    <ul className=' mt-3'>
      <li className="w-full border-b border-gray-900">Доп. контакты: {data.additional_contacts}</li>

      <li className="w-full border-b border-gray-900">
            <a href={adress_yandex_map}>Адрес: {data.adress}</a>
      </li>
      <li className="w-full border-b border-gray-900">{paid}{extra}</li>
      <li className="w-full border-b border-gray-900">клиент: {data.customer}</li>
      <li className="w-full border-b border-gray-900">метро: {data.metro}</li>
      <li className="w-full border-b border-gray-900">
        <a href={phone}>{data.phone_number}</a>
      </li>
      <li className="w-full border-b border-gray-900">время доставки: {data.tovar_arrival_time}</li>
      <li className="w-full border-b border-gray-900">
        {positions.length > 0 ? (  
          <div>
            {positions.map(d => (
                <Position
                  id = {d.id}
                  name = {d.name}
                  amount = {d.amount}
                  price = {d.price}
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





