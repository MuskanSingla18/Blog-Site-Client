import React , {useEffect} from "react"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { Regsiter } from "./pages/login/Regsiter"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { DetailsPages } from "./pages/details/DetailsPages"
import { Account } from "./pages/account/Account"
import { Create } from "./components/create/Create"
import { AuthProvider } from "./AuthContext";
import { About } from "./pages/about/about";
import { Contact } from "./pages/contact/contact"



const App = () => {

  return (
    <>
      <Router>
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/register' component={Regsiter} />
          <Route exact path='/details/:id' component={DetailsPages} />
          <Route exact path='/account' component={Account} />
          <Route exact path='/create' component={Create} />
        </Switch>
        <Footer />
        </AuthProvider>
      </Router>
    </>
  )
}
export default App
