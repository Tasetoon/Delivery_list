import React, {useState, useEffect} from 'react'


export default function position(props){
  const [position_style, setPositionStyle] = useState('border-b border-gray-900');
  const [pos_name, setName] = useState("");

  const handleClickClosePosition = async (e) => {
    e.preventDefault()
    setPositionStyle('hidden')
  }
  useEffect(() => {
    setName(props.name)
    if(pos_name && pos_name.slice(0,8) === 'Доставка'){
    }
  }, [])

    return (
        <div className={position_style}>
            <div className=' flex justify-between'>
            <h1>{props.id}</h1>
            {pos_name.slice(0,8) !== 'Доставка' ?(
                <img className='cross_img2 self-end pr-2' onClick={handleClickClosePosition} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADuUlEQVR4nO2dPW8TQRCGLRD8GNrkNqHkxk6HCB+GAiWiQUQp+QN0iEAqGgpKIpD4RmkQSp0SSgzhQ0ABSgQSufGikMSL1o4FsnDss293ZtfzStPGmee5vd27tbylkkQikUgkEolEIpFIJBKJRJIjpnrkcAbj5xCSuwiqlqUKEZSJqbJWTzXbY1ZOztqeWVwkmzBxOkvVe2pA6L/ebZbHT5GBN9XqQQS1yACEIR0ZkNwwV0oHvAsQ+OpfCQvebzvUVx4yq3qqpr3At5OPvf9RN4zMKkuTD14m5tZqh75hZFhZqqrOBSAk96gbRa6VqiX3AtLkLXmjwLZq7gVAkjFo1PCsJPMggLpJxbpEAIgA8qsQZQTQg0C5BdHDQIIKcg6oT5cNVibJ4Y2kgPrJKbP78pXZXn5mcOqoF0h6bqZZIy+gvgffbPxolg8J+uJ50/j42TQ+fTF6bnZ0R0AnfONBQht++7NcSAhCQDf4xqGETviuJLAX0Au+cSChG3wXEtgL+H37Vk/4pi3h6eOhV0e94Bctgb0AC3T70YP+JSwPPhL6hf9XwMwICPAkQRPAD0eAYwmaCH5YAhxJ0ITwwxMAxUqghh+mAChGAgf44QqA4SRwgR+2ABhMgr40ywZ++AIgvwTzdZ0N/DgEwAASmMCPRwAUJ8En/LgEwPASfMOPTwAMLoECfpwCoCVh58Xz/gV82zB6/oL//zNWATrHOv9/zwkiwDN8QyghqhGgh4BPJSEaAboA+BQSohCgC4TvW0LwAnTOF2t5Vkc+JAQtQA/yVrP5nHCfjYRgBehhXikzkhCkAF3E+3wmEoIToIvcTGEgISgB2sVOFrGEYAQ43Uas0EkIQoCXPdwKjQT2ArxuoFcmzfaTh/m+i1qeiFvAzsqKH/iQfyRs3VyMfwTUjx8zu6urfuBD/xKKgB+EgF4SGq52svaRUBT8YAR0k9BwvY3YKWH9u9lavFroZwQjoFNCw9cebluCA/jBCcA9CXZi9rqBXpk0vy7PO/nbwQnAyEoEgAggvwpRRgA9CJRbED0MJCiZAyB6AfKjfdhNQJr8dC8gVW+orzLkWql67V5A64wA+maBZd1xLsAeXsCgUcOxNlN1xrkAMzZ2CCFZo24WmZU9xMLbqRr25AjqhpFZ1UGdKPmMPTmCumlkUhmoayXfscd2ZGlynbp5JIefLJAcYdKOPTliNOeEZM37bWe/idkeXmB/P9+uheN8WEuyZm+pWrKrHdszNXeJRCKRSCQSiUQikUgkEkkpqPwBvH5Rt06PIP8AAAAASUVORK5CYII="></img>
            ) : (null)
        }
            </div>
        <ul className='grid grid-cols-4 gap-4'>
          <li className='inline'>
            <p>{props.name}</p>
          </li>
          <li className='inline'>
            <p>{props.amount}</p>
          </li>
          <li className='inline'>
            <p>{props.price}</p>
          </li>
          <li className='inline'>
            <p>{props.price * props.amount}</p>
          </li>
        </ul>
      </div>
)}