import React, {useState, useEffect} from 'react'
import { useLocalStorage } from '../../../public/static/useLocalStorage';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';


export default function position(props){
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const [mainButtonClicked, setMainButtonClicked] = useState(false);
  const [position_style, setPositionStyle] = useState('separetor pb-1');
  const [pos_name, setName] = useState("");
  const [pos_amount, setAmount] = useState(props.amount);
  const [pos_price, setPrice] = useState(props.price);
  const is_delivery = pos_name.slice(0,8) === 'Доставка' ? true : false;
  const {setItem, removeItem} = useLocalStorage(`${props.order_id}/${props.id}`);

  const handleClickClosePosition = async () => {
    if(mainButtonClicked){
      function callback(flag) {
        if(flag){
          setPositionStyle('hidden');
          removeItem(`${props.order_id}/${props.id}`);
          window.dispatchEvent(new Event("storage"));
          router.replace(`?mainButtonClicked=false`, undefined, {scroll: false})
        }
      }
      window.Telegram.WebApp.showConfirm('Вы уверены? \nВы вносите изменения после подсчета!', callback)
    }
    else{
      setPositionStyle('hidden');
      removeItem(`${props.order_id}/${props.id}`);
      window.dispatchEvent(new Event("storage"));
    }

  }


  useEffect(() => {
    
    setName(props.name);
    setItem({
      'price': pos_amount * pos_price,
      'amount': pos_amount,
      'is_delivery': is_delivery
    });
    window.dispatchEvent(new Event("storage"));
  }, [pos_amount, pos_price, is_delivery]);


  useEffect(() => {
    if(searchParams.get('mainButtonClicked') === 'true'){
      setMainButtonClicked(true);

    }
    else if(searchParams.get('mainButtonClicked') === 'false'){
      setMainButtonClicked(false);
    }

  }, [pathname, searchParams, router])
  
  return (
    <div className={position_style}>
      <Script src='/static/telegram-web-app.js' strategy='beforeInteractive'></Script>
      <div className=' flex justify-between mr-1 mb-2'>
        <h1 className='text-xl'>{props.id}</h1>
        {is_delivery ?(null) : (
          <button type="button" onClick={handleClickClosePosition} className="rounded-md inline-flex items-center justify-center cross-image">
            <span className="sr-only">Close menu</span>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          )
        }
      </div>
      <ul className='grid grid-cols-4 gap-2'>
        <li className='inline'>
          <p>{props.name}</p>
        </li>
        <li className='inline'>
        {is_delivery ?(<p className='flex justify-center'>{props.amount}</p>) :    
        (
          <div className="flex items-center gap-x-1.5">
            <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border increase-button disabled:opacity-50 disabled:pointer-events-none" tabIndex="-1" 
            onClick={() => {
              if(mainButtonClicked){
                function callback(flag) {
                  if(flag){
                    pos_amount > 0 ? setAmount(pos_amount-1): null;
                  }}
                window.Telegram.WebApp.showConfirm('Вы уверены? \nВы вносите изменения после подсчета!', callback)
              }
              else{
                pos_amount > 0 ? setAmount(pos_amount-1): null;
              } 
            }} 
            aria-label="Decrease" data-hs-input-number-decrement="">
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                </svg>
            </button>

            <input  className="p-0 w-6 bg-transparent border-0 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" style={{appearance: 'textfield'}} type="number" min=''  aria-roledescription="Number field" data-hs-input-number-input=""
              onChange={
                (e) => {
                  if(mainButtonClicked){
                    function callback(flag) {
                      if(flag){
                        parseInt(e.target.value) >= 0 ? setAmount( Math.floor(e.target.value)) : null; 
                      }}
                    window.Telegram.WebApp.showConfirm('Вы уверены? \nВы вносите изменения после подсчета!', callback)
                  }
                  else{
                    parseInt(e.target.value) >= 0 ? setAmount( Math.floor(e.target.value)) : null;
                  } 
                  

                }}
              value = {pos_amount}
              onFocus={() => { window.Telegram.WebApp.MainButton.hide() } }
              onBlur={() => { !mainButtonClicked ? window.Telegram.WebApp.MainButton.show() : null }}
            />
            
            <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border increase-button disabled:pointer-events-none" tabIndex="-1" 
            onClick={() => {
              if(mainButtonClicked){
                function callback(flag) {
                  if(flag){
                    setAmount(pos_amount+1);
                  }}
                window.Telegram.WebApp.showConfirm('Вы уверены? \nВы вносите изменения после подсчета!', callback)
              }
              else setAmount(pos_amount+1);
            }}
            aria-label="Increase" data-hs-input-number-increment="">
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
              onChange={
                (e) => {
                  if(mainButtonClicked){
                    function callback(flag) {
                      if(flag){
                        parseInt(e.target.value) >= 0 ? setPrice( Math.floor(e.target.value)) : null; 
                      }}
                    window.Telegram.WebApp.showConfirm('Вы уверены? \nВы вносите изменения после подсчета!', callback)}
                  else{
                    parseInt(e.target.value) >= 0 ? setAmount( Math.floor(e.target.value)) : null;
                  } 
                }}
              value = {pos_price}
              onFocus={() => { window.Telegram.WebApp.MainButton.hide() }}
              onBlur={() => { !mainButtonClicked ? window.Telegram.WebApp.MainButton.show() : null }}
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