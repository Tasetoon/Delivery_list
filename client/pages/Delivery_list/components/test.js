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

    const onCall1 = () => {
        tg.openLink('tel:+79060540581');
    }

    const onCall2 = () => {
        tg.openLink('tel://+79060540581');
    }

    const onReady = () => {
        tg.openLink('https://core.telegram.org/bots/webapps#initializing-mini-apps');
    }
    return (
            <div className=' h-10 w-auto'>
                <Script src='/static/telegram-web-app.js' strategy='beforeInteractive'></Script>
                <div>
                    <button onClick={onCall1}>Phone1</button>
                    <button onClick={onCall2}>Phone2</button>

                </div>
                <div>
                    <button onClick={onReady} className=' text-rose-900 text-5xl'>НАЖМИ</button>
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