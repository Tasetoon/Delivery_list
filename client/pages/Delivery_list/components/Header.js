import Router from 'next/router'
import Dropdown from './Dropdown'

export default function Header(props){
    return (
        <div className='pt-2 flex justify-between border-b border-zinc-700 tg-background'>
            <button className='pl-2 pb-2 text-blue-500' type='button' onClick={() => Router.back()}>{props.text}</button>
            <h1 className="text-center font-extrabold text-white padding-top label-font  pb-2">BigGeek Web-App</h1>
            <Dropdown/>
        </div>
)}