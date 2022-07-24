import React from 'react'

class Users extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            users:[]
        }
        this.getUsers = this.getUsers.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }


    getUsers(){
        fetch(`http://127.0.0.1:3001/users/all`, {
            method: "GET",
          })
            .then(async (result) => {
              result = await result.json();

              if (result ) {
                  console.log(result)
                  if(Array.isArray(result) && result.length > 0 ){
                      if(result.length > 0) this.setState({ users: result });
                  } 
                 
              }
            })
            .catch((err) => console.log("err", err));
    }


    deleteUser(id){
        fetch(`http://127.0.0.1:3001/users/delete/${id}`, {
            method: "POST",
          })
            .then(async (result) => {
              this.getUsers()
            })
            .catch((err) => console.log("err", err));
    }


    componentDidMount(){
        this.getUsers()
    }
    render(){
        return (
        <main className="page-content">
          <div className="container-fluid">
          <div className="card">
                <div className="card-body">
                   
                    <div className="row">
                     
                        <div className="col-md-12">
                            <h2 className="py-3 text-center font-bold font-up blue-text">المستخدمون</h2>
                        </div>
                      
                    </div>

                    <table className="table table-hover  mb-0">
                      
                        <thead>
                            <tr>
                                <th className="th-lg"><a href="">حذف</a></th>
                                <th className="th-lg"><a href=""> الوظيفة</a></th>
                                <th className="th-lg"><a href="">البريد الإلكتروني</a></th>
                                <th className="th-lg"><a href="">اللقب</a></th>
                                <th className="th-lg"><a href="">الأسم</a></th>
                                <th scope="row"><a href="">#</a></th>
                            </tr>
                        </thead>

                        <tbody>
                        {this.state.users.map(( user, index ) => {
                            return (
                                <tr key={index}>
                                    <td><i className="fa fa-trash deleteIcon" onClick={()=>this.deleteUser(user.id)}></i></td>
                                    <td>{user.role == '0' || user.role == 0 ? 'مدير' : user.role == '1' || user.role == 1 ? 'موظف' : 'مواطن'}</td>
                                    <td>{user.email}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.name}</td>
                                    <td scope="row" >{index}</td>
                                </tr>
                            );
                            })}
        
                            
                        </tbody>
                     
                    </table>
                  
                    
                   
                </div>
            </div>
          </div>
        </main>
    )
    }
};

export default Users;