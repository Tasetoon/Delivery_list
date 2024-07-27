import Script, { handleClientScriptLoad } from 'next/script';
import React, { useState, useEffect } from 'react'
const Dropdown = () => {
    const [tg, setTg] = useState();
    // const [mainButton, setMainButton] = useState();

    useEffect(() => {
        setTg(window.Telegram.WebApp);
        // setMainButton(tg.MainButton);

        window.Telegram.WebApp.MainButton.show();

        window.Telegram.WebApp.setBackgroundColor("#8A2BE2")
        console.log(window.Telegram.WebApp.backgroundColor);
        console.log(window.Telegram.WebApp.headerColor);
        console.log(window.Telegram.WebApp.version);

      }, [])

    const onClose = () => {
        tg.close();
    }

    const onReady = () => {
        tg.showConfirm('Сосал?')
        console.log(tg)
    }

    return (
            <div className=' h-10 w-auto'>
                <Script src='/static/telegram-web-app.js' strategy='beforeInteractive'></Script>
                <div>
                    <button onClick={onClose}>Close</button>
                </div>
                <div>
                    <button onClick={onReady}>Check</button>
                </div>
                <a href='https://yandex.ru/maps/?text=ВШЭ' className=' text-blue-500'>кликай сюды</a>

                <div className=' text-white mt-10 h-auto w-auto flex flex-col'>
                    <a href='https://t.me/+79060540581'>позовнить по тг</a>
                    <a href='https://wa.me/+79060540581'>позовнить по ватсапп</a>
                    <a href='tel:+79060540581'>позовнить просто</a>
                    <a href='tel://+79060540581'>позовнить просто//</a>
                </div>
            </div>
        
    )
}

export default Dropdown;