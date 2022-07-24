import React from 'react'
import Reclamation from './Reclamation.jsx'
import Intervenir from './intervenir.jsx'
import Users from "./users.jsx"
import Mapdash from './mapDash.jsx'
import Create from './create.jsx'
class Sidebar extends React.Component {

    constructor(props){
        super(props)
        this.state={
          nav:"rec",
          role:'',
          toggled:false
        }
        this.toggler = this.toggler.bind(this);
    }
    
    Switcher(value){
      this.setState({nav:value})
    }

    adminActions(){
      if(this.props?.user?.role == 0){
        return(<>
          <li>
            <a onClick={()=>this.Switcher("users")}>
              
              <span>المستخدمون&nbsp;&nbsp;</span>
              <i className="fa fa-user-circle"></i>
            </a>
          </li>
          <li>
            <a onClick={()=>this.Switcher("create")}>
              
              <span>تسجيل حساب&nbsp;&nbsp;</span>
              <i className="fa fa-user-circle"></i>
            </a>
          </li>
          </>
        )
      }
    }
    logOut() {
      var cookies = document.cookie.split(";");
  
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      location.reload();
  }
    toggler(){
      if ($(".toggled")[0]){
        $(".page-wrapper").removeClass("toggled");
        this.setState({toggled:true})
    } else {
      $(".page-wrapper").addClass("toggled");
      this.setState({toggled:false})
    }
      
    }
    
    componentDidMount(){
      if(this.props.user.role==0){
        this.setState({role:''})
      }
  }
    render(){
      let {nav,role,toggled} = this.state;
        const navigation = () => {
            console.log(nav)
            if(nav == "rec"){
                return <Reclamation  />;
            }
            else if (nav =="int" ) {
              return <Intervenir />;
            }else if (nav =="users" ) {
              return <Users />;
            }else if (nav =="map" ) {
            
              return <Mapdash toggled={toggled} />;
            }else if (nav =="create" ) {
              return <Create />;
            } else if(nav == "sign") {
              return <div></div>
            }
          }
        return (
            <div className="page-wrapper chiller-theme toggled">
  <a id="show-sidebar" className="btn btn-sm btn-dark" onClick={this.toggler}>
    <i className="fas fa-bars" style={{color:"white"}}></i>
  </a>
  <nav id="sidebar" className="sidebar-wrapper">
    <div className="sidebar-content">
      <div className="sidebar-brand">
        <a href="#">Sanhaja</a>
        <div id="close-sidebar" onClick={this.toggler}>
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className="sidebar-header">
        <div className="user-pic">
          <img className="img-responsive img-rounded" src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png"
            alt="User picture" />
        </div>
        <div className="user-info">
          <span className="user-name">{this.props?.user?.name}
            <strong> {this.props?.user?.lastname}</strong>
          </span>
          <span className="user-role" style={{textAlign:'right',fontSize:'17px'}}>{this.props.user.role==0 ? 'مدير' : 'موظف'}</span>
        </div>
      </div>
      
     
      <div className="sidebar-menu" style={{textAlign:"right",fontSize:'17px'}}>
        <ul>
          <li>
            <a onClick={()=>this.Switcher("rec")}>
              
              <span>شكاوي&nbsp;&nbsp;</span>
              <i className="fa fa-exclamation-circle"></i>
            </a>
          </li>
          <li>
            <a onClick={()=>this.Switcher("int")}>
              
              <span>تدخلات&nbsp;&nbsp;</span>
              <i className="fa fa-check-square"></i>
            </a>
          </li>
          <li>
            <a onClick={()=>this.Switcher("map")}>
              
              <span>الخارطة&nbsp;&nbsp;</span>
              <i className="fa fa-map-marker"></i>
            </a>
          </li>
          {this.adminActions() }
          
          <li>
            <a onClick={this.logOut}>
              
              <span>تسجبل الخروج&nbsp;&nbsp;</span>
              <i className="fa fa-sign-out"></i>
            </a>
          </li>
        </ul>
      </div>
      
    </div>
  </nav>
          {navigation()}
      </div>
   

    
        )
    }


}
export default Sidebar;