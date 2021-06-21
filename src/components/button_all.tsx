import { useState } from "react"

type ButtonProps = {
    text?: string;
}

export function ButtonOld(props: ButtonProps){
    return(
        <button>{props.text || 'Default'}</button>
    )
}

export function ButtonIncrement(){
    const [count, setCount] = useState(0)

    function increment(){
        setCount(count + 1)
    }

    return(
        <button onClick={increment}>{count}</button>
    )
}