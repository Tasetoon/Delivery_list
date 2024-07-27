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
          <h1 className='text-9xl'>🐸</h1>
          <h1 className='m-5'>BigGeekApp</h1>

        </div>
      </header>
      <main className='main'>
          <a href='Delivery_list/'>
            <div className='mt-10 m-2 flex font-medium rounded-lg p-3 section'>
              <img className='main-icon rounded-full' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACbElEQVR4nO3aTUtUURzH8elh4yrfQdQ2oVW9AGlhiza1a6GboLZRUS9BM2gRVJAFCmlIZESQLrKHjQQzqekgjZXmNXQap3y6M83jPy6GoHd2XX8X7v1+4ewOzNzP4tyHcxJGkhKanyGgRQEtCmhRQIsCWhTQooAWBbQooEUBLQpoUUCLAloU0KKAFgW0KKBFAS0KaFFAiwJaFNCigBYFtCigRQEtCmhRQEcd+nE6b+0v5+zKqGNzqyWLeqFAX3+7aInO5PY4dHu8IXa1XrepnwVLLrmBjNSya5vlWjyg3XLNDt5M7YD2xuXXjm/uhVfzvnn/O47cm7JipRZ96MX1ckOA8y+++eYef5QOHNob3n+IxdLR8tAP2De94ps39mPTzg19tVNPMoGM04Oz1jOZC+OSw4FO54rb2N4ycu2NY3WLdqE+3i2slUK7OanjOVoU0KKAFgW0KKCjDL36p2oXh7/b4buf7ETvjA1lflvUCwX6zNPZHS8r+7uS9m5hwzcv61bsTiprnWNLgYzuD8s2nnXjAb1SqNi+Bq/F3neN3bUOfA789bvp1kfLFyvqy44n9K9iNb5Lx3uHpWNPboaXRrZuhid7Z+w5N0MKKp6jRQEtCmhRQIviw3+UoadzBTvWs7WVdaArZVdH2coKfXP27LMvgW3Otg1m7MFETDZnnfUSxw3icIDm6P2YHKDxurHrSFgzR8L2rv503jr+HXKcX+OQIwUULyyigBYFtCigRQEtCmhRQIsCWhTQooAWBbQooEUBLQpoUUCLAloU0KKAFgW0KKBFAS0KaFFAiwJaFNCigBYFtCigRQFtGui/lghc2FNlZcgAAAAASUVORK5CYII="/>
              <h1 className='ml-4 self-center text-center font-extrabold text-white padding-top label-font '>Маршрутный лист</h1>
            </div>
          </a>
          <a href='Delivery_list/components/test'>
            <div className='m-2 flex font-medium rounded-lg p-3 section'>
              <img className='main-icon rounded-full' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACbElEQVR4nO3aTUtUURzH8elh4yrfQdQ2oVW9AGlhiza1a6GboLZRUS9BM2gRVJAFCmlIZESQLrKHjQQzqekgjZXmNXQap3y6M83jPy6GoHd2XX8X7v1+4ewOzNzP4tyHcxJGkhKanyGgRQEtCmhRQIsCWhTQooAWBbQooEUBLQpoUUCLAloU0KKAFgW0KKBFAS0KaFFAiwJaFNCigBYFtCigRQEtCmhRQEcd+nE6b+0v5+zKqGNzqyWLeqFAX3+7aInO5PY4dHu8IXa1XrepnwVLLrmBjNSya5vlWjyg3XLNDt5M7YD2xuXXjm/uhVfzvnn/O47cm7JipRZ96MX1ckOA8y+++eYef5QOHNob3n+IxdLR8tAP2De94ps39mPTzg19tVNPMoGM04Oz1jOZC+OSw4FO54rb2N4ycu2NY3WLdqE+3i2slUK7OanjOVoU0KKAFgW0KKCjDL36p2oXh7/b4buf7ETvjA1lflvUCwX6zNPZHS8r+7uS9m5hwzcv61bsTiprnWNLgYzuD8s2nnXjAb1SqNi+Bq/F3neN3bUOfA789bvp1kfLFyvqy44n9K9iNb5Lx3uHpWNPboaXRrZuhid7Z+w5N0MKKp6jRQEtCmhRQIviw3+UoadzBTvWs7WVdaArZVdH2coKfXP27LMvgW3Otg1m7MFETDZnnfUSxw3icIDm6P2YHKDxurHrSFgzR8L2rv503jr+HXKcX+OQIwUULyyigBYFtCigRQEtCmhRQIsCWhTQooAWBbQooEUBLQpoUUCLAloU0KKAFgW0KKBFAS0KaFFAiwJaFNCigBYFtCigRQFtGui/lghc2FNlZcgAAAAASUVORK5CYII="/>
              <h1 className='ml-4 self-center text-center font-extrabold text-white padding-top label-font '>Тест</h1>
            </div>
          </a>
      </main>
      <footer className='footer'>
      </footer>

    </div>
  )
}
export default index
