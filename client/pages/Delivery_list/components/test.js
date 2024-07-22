import React, { useState } from 'react'
const Dropdown = () => {
    return (
            <div className=' h-10 w-auto'>
                
                <a href='https://yandex.ru/maps/?text=ВШЭ' className=' text-blue-500'>кликай сюды</a>

                <div className=' text-white mt-10 h-auto w-auto flex flex-col'>
                    <a href='https://t.me/+79163874742'>позовнить по тг</a>
                    <a href='https://wa.me/+79163874742'>позовнить по ватсапп</a>
                    <a href='tel:+79163874742'>позовнить просто</a>
                </div>
            </div>
        
    )
}

export default Dropdown;