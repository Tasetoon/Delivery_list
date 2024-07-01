import React, {useEffect, useStatem, useRef, useState} from 'react'
function index() {
  const [data, setData] = useState({});
  const [products, setProducts] = useState([]);
  const [adress_yandex_map, setAdressurl] = useState('');
  useEffect(() => {
    fetch('http://localhost:8080/order')
              .then((response) => response.json())  
              .then((data) => {
                setData(data);
                setProducts(data.tovars);
                setAdressurl(`https://yandex.ru/maps/?text=${data.adress}`);
        })
  }, []);

  

  return (
  <div className='min-h-screen bg-slate-700'>

    <ul className="width text font-medium rounded-lg bg-gray-700 border-gray-900 text-white">
      <li className="w-full li-el border-b border-gray-900">
            <a href={adress_yandex_map}>{data.adress}</a>

      </li>
      <li className="w-full li-el border-b border-gray-900">клиент: {data.customer}</li>
      <li className="w-full li-el border-b border-gray-900">метро: {data.metro}</li>
      <li className="w-full li-el border-b border-gray-900">номер заказа: {data.order_id}</li>
      <li className="w-full li-el border-b border-gray-900">номер телефона: {data.phone_number}</li>
      <li className="w-full li-el border-b border-gray-900">время доставки: {data.tovar_arrival_time}</li>
      <li className="w-full li-el border-b border-gray-900">
        {
          products.map(d => (
            <div className='border-b border-gray-900'>
              <h1>Заказ - {d.id}</h1>
              <ul className='flex row-auto justify-between'>
                <li className='inline'>
                  <p>Название</p>
                  <p>{d.name}</p>
                </li>
                <li className='inline'>
                  <p>Кол-во</p>
                  <p>{d.amount}</p>
                </li>
                <li className='inline'>
                  <p>Цена</p>
                  <p>{d.price}</p>
                </li>
                <li className='inline border-b'>
                  <p>Итого</p>
                  <p>{d.price * d.amount}</p>
                </li>
              </ul>
            </div>
        ))
        }
      </li>
    </ul>
  </div>
  )
}

export default index