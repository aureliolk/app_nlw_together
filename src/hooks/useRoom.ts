import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type QuestionsType = {
    id: string
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHighLithed: boolean
    likeCount:number
    likeId: string | undefined

}

type FirebaseQuestions = Record<string, {
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHighLithed: boolean
    likes: Record<string, {
        authorId:string
    }>
}>

export function useRoom(roomId: string){
    const [questions, setQuestions] = useState<QuestionsType[]>([])
    const [title, setTitle] = useState('')
    const { user } = useAuth()

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
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0]
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestion)
        })

        return() => {
            roomRef.off("value")
        }
    }, [roomId, user?.id])

    return{ questions , title}
}