import { useHistory, useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import { Button } from '../components/Button'
import { ButtonCodeRoom } from '../components/ButtonCodeRoom'
import { Questions } from '../components/Question'
import { useRoom } from '../hooks/useRoom'

import "../style/rooms.scss"
import { database } from '../services/firebase'



type RoomsParans = {
    id: string
}



export function AdminRoom() {
    const history = useHistory()
    const params = useParams<RoomsParans>()
    const roomId = params.id
    const { questions, title } = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }
    
    async function deleteQuestions(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
             await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                        <ButtonCodeRoom code={roomId} />
                        <Button isOutLined onClick={handleEndRoom}>Encerra Sala </Button>
                    </div>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>{title}</h1>
                    {questions.length > 0 && <span>{questions.length} Perguntas</span>}
                </div>

                <div className="questions-list">
                    {questions.map(value => {
                        return (
                            <Questions
                                key={value.id}
                                content={value.content}
                                author={value.author}
                            >
                                <button
                                    type='button'
                                    onClick={()=> deleteQuestions(value.id)}
                                >
                                    <img src={deleteImg} alt="Apagar Pergunta" />
                                </button>
                            </Questions>
                        )
                    })}
                    <div></div>
                </div>
            </main>
        </div>
    )
}