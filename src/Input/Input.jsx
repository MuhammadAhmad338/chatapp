import React from 'react'

const Input = ({message, setmessage, sendMessage}) => {
    return (
        <form className='form'>
            <input type="text"
                className='input'
                value={message}
                placeholder='Type a message...'
                onChange={(e) => setmessage(e.target.value)}
                onKeyDown={(event) => event.key === "Enter" ? sendMessage(event) : null}
            />
            <button className='sendButton' onClick={(e) => sendMessage(e)}>Send</button>
        </form>
    );
}

export default Input