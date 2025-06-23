import HeaderWithoutAccount from './components/headers/HeaderWithoutAccount'
import HeaderWithAccount from './components/headers/HeaderWithAccount'
import BotonR from './components/Button';


function App() {
  const handleClick = () => {
    alert('Que chingue a su madre Jorge');
  };

  return (
      <div>
        <HeaderWithoutAccount />
        <HeaderWithAccount />
        <BotonR  text='LOG IN' onClick={handleClick}/>
      </div>
  )
}

export default App
