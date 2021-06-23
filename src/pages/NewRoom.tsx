// import { useContext } from 'react'
import {Link} from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'
import ImageIlustration from "../assets/images/illustration.svg"
import ImagenLogo from "../assets/images/logo.svg"
import { Button } from "../components/button"
import '../style/auth.scss'


export function NewRoom() {
    // const {user} = useContext(AuthContext)

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
                    <form>
                        <input type="text" placeholder="Nome da Sala" />
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