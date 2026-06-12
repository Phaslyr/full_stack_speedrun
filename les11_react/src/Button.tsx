import { useState } from 'react';
import './App.css'

export type ButtonProps = {
    title: String;
    text?: String;
}

function Button ({title, text = "Press Me!"}: ButtonProps) {
    const [count, setCount] = useState(0);

    return <>
        <h1>{title}</h1>
        <button className="counter" onClick={() => setCount(count + 1)}>{text}</button>
        <p>Count: {count}</p>
    </>;
}

export default Button;