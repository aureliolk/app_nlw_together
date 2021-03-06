import copyImg from '../assets/images/copy.svg'
import '../style/room-code.scss'

type RoomCodeProps = {
    code: string;
}

export function ButtonCodeRoom(props: RoomCodeProps) {

    function copyRoomCodeToClipBoard(){
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="Copy Room Code" />
            </div>
            <span>{props.code}</span>

        </button>
    )
}