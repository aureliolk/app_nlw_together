import { useEffect } from 'react'
import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { ButtonCodeRoom } from '../components/ButtonCodeRoom'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import "../style/rooms.scss"

type FirebaseQuestions = Record<string, {
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHighLithed: boolean
}>

type RoomsParans = {
    id: string
}

type Questions = {
    id: string
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHighLithed: boolean
}

export function Room() {
    const params = useParams<RoomsParans>()
    const { user } = useAuth()
    const [newQuestion, setnewQuestion] = useState('')
    const [ questions, setQuestions] = useState<Questions[]>([])
    const [ title, setTitle ] = useState('')
    const roomId = params.id

    useEffect(() => {
        const roomRef = database.ref(`/rooms/${roomId}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const firedatabaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
            const parsedQuestion = Object.entries(firedatabaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLithed: value.isHighLithed,
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestion)
            console.log(parsedQuestion)
        })
    }, [roomId])

    async function sendQuestion(event: FormEvent) {
        event.preventDefault()

        if (newQuestion.trim() === '') {
            return
        }

        if (!user) {
            throw new Error('Você precisa está logado')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighLithed: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)
        setnewQuestion('')
    }
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <ButtonCodeRoom code={roomId} />
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>{title}</h1>
                    {questions.length > 0 && <span>{questions.length} Perguntas</span>}
                </div>

                <form onSubmit={sendQuestion}>
                    <textarea
                        placeholder="O que quer perguntar"
                        onChange={event => setnewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>Faça seu Login</button></span>
                        )}
                        <Button type="submit" disabled={!user}> Enviar Pergunta </Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </main>
        </div>
    )
}