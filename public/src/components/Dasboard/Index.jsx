import React from 'react'

import Sidebar from './pages/sidebar.jsx'

class Dashboard extends React.Component {
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div>
                <Sidebar user={this.props.user}/>
            </div>
            
        );
    }

}

export default Dashboard;