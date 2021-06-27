import { useHistory } from 'react-router-dom'
import ImageIlustration from "../assets/images/illustration.svg"
import ImagenLogo from "../assets/images/logo.svg"
import ImagenGoogle from "../assets/images/google-icon.svg"
import { Button } from "../components/Button"
import { useAuth } from '../hooks/useAuth'
import '../style/auth.scss'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'



export function Home() {
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()
    const [codeRoom, setCodeRoom] = useState('')

    async function navigateToNewRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault()

        if(codeRoom.trim() === ''){
            return
        }

        const roomRef = await database.ref(`rooms/${codeRoom}`).get()
        if(!roomRef.exists()){
            alert('Sala Não Existe')
            return
        }

        if(roomRef.val().endedAt){
            alert('Sala Ja Fechada')
            return
        }

        history.push(`/rooms/${codeRoom}`)
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
                    <button className="create_room" onClick={navigateToNewRoom}>
                        <img src={ImagenGoogle} alt="Imagen do Google" />
                        <span>Crie sua sala com o Google</span>
                    </button>

                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text"
                        placeholder="Digite o Codigo da Sala"
                        onChange={event => setCodeRoom(event.target.value)}
                        value={codeRoom}
                        />
                        <Button type="submit">
                            {/* <img src="" alt="" /> */}
                            <span>Entra na Sala</span>
                        </Button>
                    </form>
                </div>
            </main>
        </div>

    )
}