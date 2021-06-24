import { useState,FormEvent } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Button } from "../components/Button"
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
import ImageIlustration from "../assets/images/illustration.svg"
import ImagenLogo from "../assets/images/logo.svg"
import '../style/auth.scss'


export function NewRoom() {
    const {user} = useAuth()
    const [ newRoom, setNewRoom] =  useState('')
    const history = useHistory()

    async function createRoom(event: FormEvent){
        event.preventDefault()
        if(user){
            if(newRoom.trim() === ''){
                return
            }
            const roomRef = database.ref('rooms')
            const firebaseRoom = await roomRef.push({
                title: newRoom,
                authorId: user?.id,
            })
            history.push(`/rooms/${firebaseRoom.key}`)
        }
    }
    
    return (
        <div id="page-auth">
            <aside>
                <img src={ImageIlustration} alt="Imagen do Cabeçalho" />
                <strong>Toda Pergunta tem uma resposta.</strong>
                <p>Aprenda e compartilhe conhecimentos com outras pessoas</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={ImagenLogo} alt="Logo do App" />
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={createRoom}>
                        <input 
                        type="text" 
                        placeholder="Nome da Sala" 
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        <Button type="submit">
                            {/* <img src="" alt="" /> */}
                            <span>Cria Sala</span>
                        </Button>
                    </form>
                    <p>Quer entra em uma sala existente <Link to="/">Clique Aqui</Link></p>
                </div>
            </main>
        </div>

    )
}