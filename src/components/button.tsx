type ButtonProps = {
    text?: string;
    children?:string
}

function Button(props: ButtonProps){
    return(
        <button>{props.text || props.children || 'default'}</button>
    )
}

export default Button;