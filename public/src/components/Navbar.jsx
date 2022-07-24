import React from "react"




class Navbar extends React.Component{
    constructor(props){
        super(props)
        
    }
	navHandler() {
		this.props.handler("sign")
       
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
    render(){
		
        return(
			<header className="header">
			<a href="#" className="logo">Sanhaja</a>
			<button className="header__btn_open-topnav header__btn"><span className="icon-menu-open"></span></button>
			<ul className="topnav topnav_mobile_show">
				<button className="header__btn_close-topnav header__btn"><span className="icon-menu-close"></span></button>
				<li className="topnav__item">
				<a href="#" className="topnav__link" onClick = {()=>this.props.handler("acceuil")}>استقبال</a>
				</li>
				<li className="topnav__item">
				<a  className="topnav__link" onClick = {()=>this.props.handler("map")}>الخارطة</a>
				</li>
				{this.props.logged ?
				<li className="topnav__item">
				<a  className="topnav__link" onClick = {()=>this.props.handler("reclamation")}>شكاوي</a>
				</li> : <li className="topnav__item">
				<a  className="topnav__link" onClick = {()=>this.props.handler("register")}> تسجيل</a>
				</li>}
				{this.props.logged ? <li className="topnav__item">
				<a  className="topnav__link" onClick = {()=>this.logOut()}>تسجيل الخروج</a>
				</li> : <li className="topnav__item">
				<a  className="topnav__link" onClick = {()=>this.props.handler("sign")}>تسجيل الدخول</a>
				</li> }
				
				
			</ul>
			</header>
        )
    }
}

export default Navbar;