import React, {useState, useEffect} from 'react'
import { useLocalStorage } from '../../../public/static/useLocalStorage';
import Script from 'next/script';


export default function position(props){
  const [position_style, setPositionStyle] = useState('border-b border-gray-900');
  const [pos_name, setName] = useState("");
  const [pos_amount, setAmount] = useState(props.amount);
  const [pos_price, setPrice] = useState(props.price);
  const is_delivery = pos_name.slice(0,8) === 'Доставка' ? true : false;

  const {setItem, removeItem} = useLocalStorage(`${props.order_id}/${props.id}`);

  const handleClickClosePosition = async () => {
    setPositionStyle('hidden');
    removeItem(`${props.order_id}/${props.id}`);
    window.dispatchEvent(new Event("storage"));

  }
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.MainButton.show();
    tg.MainButton.setText('Посчитать меня');
  }, []);


  useEffect(() => {
    
    setName(props.name);
    setItem({
      'price': pos_amount * pos_price,
      'amount': pos_amount,
      'is_delivery': is_delivery
    });
    window.dispatchEvent(new Event("storage"));
  }, [pos_amount, pos_price, is_delivery]);
  
  return (
    <div className={position_style}>
      <Script src='/static/telegram-web-app.js' strategy='beforeInteractive'></Script>
      <div className=' flex justify-between'>
        <h1>{props.id}</h1>
        {is_delivery ?(null) : (
          <button type="button" onClick={handleClickClosePosition} className="rounded-md inline-flex items-center justify-center cross-image">
            <span class="sr-only">Close menu</span>
            <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
            // <img onClick={handleClickClosePosition} className='cross_img2 self-end pr-2' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADuUlEQVR4nO2dPW8TQRCGLRD8GNrkNqHkxk6HCB+GAiWiQUQp+QN0iEAqGgpKIpD4RmkQSp0SSgzhQ0ABSgQSufGikMSL1o4FsnDss293ZtfzStPGmee5vd27tbylkkQikUgkEolEIpFIJBKJRJIjpnrkcAbj5xCSuwiqlqUKEZSJqbJWTzXbY1ZOztqeWVwkmzBxOkvVe2pA6L/ebZbHT5GBN9XqQQS1yACEIR0ZkNwwV0oHvAsQ+OpfCQvebzvUVx4yq3qqpr3At5OPvf9RN4zMKkuTD14m5tZqh75hZFhZqqrOBSAk96gbRa6VqiX3AtLkLXmjwLZq7gVAkjFo1PCsJPMggLpJxbpEAIgA8qsQZQTQg0C5BdHDQIIKcg6oT5cNVibJ4Y2kgPrJKbP78pXZXn5mcOqoF0h6bqZZIy+gvgffbPxolg8J+uJ50/j42TQ+fTF6bnZ0R0AnfONBQht++7NcSAhCQDf4xqGETviuJLAX0Au+cSChG3wXEtgL+H37Vk/4pi3h6eOhV0e94Bctgb0AC3T70YP+JSwPPhL6hf9XwMwICPAkQRPAD0eAYwmaCH5YAhxJ0ITwwxMAxUqghh+mAChGAgf44QqA4SRwgR+2ABhMgr40ywZ++AIgvwTzdZ0N/DgEwAASmMCPRwAUJ8En/LgEwPASfMOPTwAMLoECfpwCoCVh58Xz/gV82zB6/oL//zNWATrHOv9/zwkiwDN8QyghqhGgh4BPJSEaAboA+BQSohCgC4TvW0LwAnTOF2t5Vkc+JAQtQA/yVrP5nHCfjYRgBehhXikzkhCkAF3E+3wmEoIToIvcTGEgISgB2sVOFrGEYAQ43Uas0EkIQoCXPdwKjQT2ArxuoFcmzfaTh/m+i1qeiFvAzsqKH/iQfyRs3VyMfwTUjx8zu6urfuBD/xKKgB+EgF4SGq52svaRUBT8YAR0k9BwvY3YKWH9u9lavFroZwQjoFNCw9cebluCA/jBCcA9CXZi9rqBXpk0vy7PO/nbwQnAyEoEgAggvwpRRgA9CJRbED0MJCiZAyB6AfKjfdhNQJr8dC8gVW+orzLkWql67V5A64wA+maBZd1xLsAeXsCgUcOxNlN1xrkAMzZ2CCFZo24WmZU9xMLbqRr25AjqhpFZ1UGdKPmMPTmCumlkUhmoayXfscd2ZGlynbp5JIefLJAcYdKOPTliNOeEZM37bWe/idkeXmB/P9+uheN8WEuyZm+pWrKrHdszNXeJRCKRSCQSiUQikUgkEkkpqPwBvH5Rt06PIP8AAAAASUVORK5CYII="></img>
          )
        }
      </div>
      <ul className='grid grid-cols-4 gap-2'>
        <li className='inline'>
          <p>{props.name}</p>
        </li>
        <li className='inline'>
        {is_delivery ?(<p>{props.amount}</p>) :    
        (
          <div className="flex items-center gap-x-1.5">
            <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border increase-button disabled:opacity-50 disabled:pointer-events-none" tabIndex="-1" onClick={() => pos_amount > 0 ? setAmount(pos_amount-1): null} aria-label="Decrease" data-hs-input-number-decrement="">
            
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                </svg>
            </button>

            <input  className="p-0 w-6 bg-transparent border-0 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" style={{appearance: 'textfield'}} type="number" min=''  aria-roledescription="Number field" data-hs-input-number-input=""
              onChange={(e) => {parseInt(e.target.value) >= 0 ? setAmount( Math.floor(e.target.value)) : null;}}
              value = {pos_amount}
              onFocus={() => {window.Telegram.WebApp.MainButton.hide()}}
              onBlur={() => {window.Telegram.WebApp.MainButton.show()}}
            />
            
            <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border increase-button disabled:pointer-events-none" tabIndex="-1" onClick={() => setAmount(pos_amount+1)} aria-label="Increase" data-hs-input-number-increment="">
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                </svg>
            </button>
          </div>     
        )
        }
        </li>
        <li className='inline'>
        <div className="flex items-center gap-x-1.5">
            <input className="p-0 w-16 bg-transparent border-0 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" style={{appearance: 'textfield'}} type="number"   aria-roledescription="Number field" data-hs-input-number-input=""
              onChange={(e) => parseInt(e.target.value) >= 0 ? setPrice( Math.floor(e.target.value)) : null}
              value = {pos_price}
              onFocus={() => {window.Telegram.WebApp.MainButton.hide()}}
              onBlur={() => {window.Telegram.WebApp.MainButton.show()}}
            />
        </div>
        </li>
        <li className='inline'>
          <p>{pos_amount * pos_price}</p>
        </li>
      </ul>
    </div>
  )
}