import Button from "./components/button";
import {ButtonOld, ButtonIncrement} from "./components/button_all"
import "./services/firebase"

function App() {
  return (
    <>
   <h1>Yous is Programmer</h1>
   <Button text="Button With Export Default"/>
   <Button>Clique Aqui</Button>
   <Button></Button>
    <br></br>
    <ButtonOld text="Button 2 outwith Export Default"/>
    <ButtonOld/>
    <ButtonOld/>
    <br></br>
    <ButtonIncrement />
    <ButtonIncrement />
    <ButtonIncrement />
    <ButtonIncrement />
    </>
  );
}

export default App;
