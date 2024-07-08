'use client'
import React, { useState } from 'react'

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div className="relative inline-block">
                <img className='my_img pr-2' onClick={toggleDropdown} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABAklEQVR4nO3XPUoEMRgG4FR6B72hf1fYRki23EutSrI7FlbeQrRXJiI2so6LGRjyPBCYIrwk8GXyJQQAAAAAAAAAAAAAAAAAAADo2+b5NMR8HVK5DzG/1TF+p3wVVk8n3ec3dTuch5QfQyrvP45Yhjqn1/zmlX9o8d9jf9RJ2Cw8v7lUbiYs/quSLrvLby6Wh+kbyHfd5TeX8uvkDYxze8tv7k8bKC/d5TdXW83JFbTtLr+5z95/2gbW5aK7/HkeYGX4/QIru6PbxLjg/FnUh0zZH1z8enfWbf4sxuoY++TxP1kvtjq29dj+R+WsFp4PAAAAAAAAAAAAAAAAAAAAYck+APtNXktYMMpCAAAAAElFTkSuQmCC"/>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-30 rounded-lg bg-zinc-800 ring-1 ring-black ring-opacity-5 mr-2">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-white rounded-t-lg hover:bg-zinc-700 border-gray-900 border-b"
                                    onClick={closeDropdown}
                                >
                                    Настройки
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-white rounded-b-lg hover:bg-zinc-700 border-gray-900"
                                    onClick={closeDropdown}
                                >
                                    Контакты
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dropdown;