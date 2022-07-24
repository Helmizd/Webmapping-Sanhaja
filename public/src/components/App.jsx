import React from "react";
import Map from "./Map.jsx"
import Navbar from './Navbar.jsx'
import SignInSide from './sigin.jsx'
import Dashboard from './Dasboard/Index.jsx'
import Acceuil from './acceuil.jsx'
import SignUp from './signup.jsx'
import Reclamation from './Reclamations.jsx'
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:"acceuil",
            isLogged:false,
            userInfo:{}
        }
        this.handler = this.handler.bind(this)
        this.map = React.createRef()
    }
    handler(value) {
        this.setState({
            page: value
        })
      }
      getData(){
        fetch(`http://127.0.0.1:3001/users`, {
            method: "GET",
          })
            .then(async (result) => {
              result = await result.json();
              if (result ) {
                  if(Array.isArray(result) ){
                      if(result.length > 0) this.setState({ userInfo: result[0],isLogged:true });
                      console.log(result[0])
                  } 
                  else if (result !== null && typeof result === 'object' ) this.setState({ userInfo: result,isLogged:true });
              }
            })
            .catch((err) => console.log("err", err));
      }
      
      componentDidMount(){
        this.getData()
        
      }

    render(){
        let {page,isLogged,userInfo} = this.state;
        const Page = () => {
          
            if(isLogged && (userInfo.role == 1|| userInfo.role == 0)){
                
                return <Dashboard  user={userInfo}/>;
            }
            if(page ==="acceuil"){
              
                return <Acceuil />
            }
            else if (page =="map" ) {
              
              return <Map logged={isLogged} user={userInfo} ref={this.map}/>;
              
            } else if(page == "sign") {
              return <SignInSide handler = {this.handler} />
            }
            else if(page == "register") {
              return <SignUp handler = {this.handler}  />
            }
            else if(page == "reclamation") {
              return <Reclamation user={userInfo}  />
            }
          }
        return(
            <div>
                
                {isLogged && (userInfo.role == 1|| userInfo.role == 0)  ?  "" :   <Navbar handler = {this.handler} logged={this.state.isLogged}/>}
                {Page()}
            </div>
            
        )
    }
}

export default App;