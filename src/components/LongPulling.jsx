import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../App.css'

const LongPulling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages')
            setMessages(prev => [data, ...prev])
            subscribe()
        } catch (e) {
            setTimeout( () => {
                subscribe()
            }, 500)
        }
    }

    const sendMessage =  () => {
        console.log(value)
        axios.post('http://localhost:5000/new-messages', {
            id: Date.now(),
            message: value,
        })
    }

    return (
        <div className="center">
            <div className="form">
                <input
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    type="text"
                />
                <button onClick={sendMessage}>Отправить</button>
            </div>
            <div className="messages">
                {messages && messages.map(mess =>
                    mess == undefined ? '':
                    <div key={mess.id} className="message" >
                        {mess.message}
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default LongPulling;