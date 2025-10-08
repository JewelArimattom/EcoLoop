import Navbar from "./components/layout/Navbar"
const App = () => {
  return (
    <div>
     <Navbar { ...{isLoggedIn: true, userName: 'John Doe', onLogout: () => {}}}/>
    </div>
  )
}

export default App
