
import {useHistory} from 'react-router-dom'
import ImageIlustration from "../assets/images/illustration.svg"
import ImagenLogo from "../assets/images/logo.svg"
import ImagenGoogle from "../assets/images/google-icon.svg"
import { Button } from "../components/button"
import '../style/auth.scss'
import { useAuth } from '../hooks/useAuth'


export function Home() {
    const history = useHistory()
    const {signInWithGoogle,user} = useAuth()

    async function navigateToNewRoom(){
        if(!user){
           await signInWithGoogle()
        }

        history.push('/rooms/new')
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
                    <form>
                        <input type="text" placeholder="Digite o Codigo da Sala" />
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