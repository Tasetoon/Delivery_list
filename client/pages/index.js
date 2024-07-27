import React, { useState, useEffect } from 'react'
import Script, { handleClientScriptLoad } from 'next/script';
function index() {
  const [tg, setTg] = useState();

  useEffect(() => {
      setTg(window.Telegram.WebApp);
    }, [])

  return (
    <div className='wrapper'>
      <header className='header flex justify-center pt-10'>
        <Script src='/static/telegram-web-app.js' strategy='beforeInteractive'></Script>
        <div className='text-center '>
          <h1 className='text-8xl'>🐸</h1>
          <h1 className='m-5'>BigGeekApp</h1>

        </div>
      </header>
      <main className='main'>
        <div className='section'>

        
          <a href='Delivery_list/'>
            <div className='mt-10 m-2 flex font-medium rounded-lg p-3'>
              <h1 className='text-xl'>📋</h1>
              <h1 className='ml-4 self-center text-center font-extrabold'>Маршрутный лист</h1>
            </div>
          </a>
          <a href='Delivery_list/components/test'>
            <div className='m-2 flex font-medium rounded-lg p-3'>
              <h1 className='text-xl'>📋</h1>
              <h1 className='ml-4 self-center text-center font-extrabold'>Тест</h1>
            </div>
          </a>

        </div>
      </main>
      <footer className='footer'>
      </footer>

    </div>
  )
}
export default index
