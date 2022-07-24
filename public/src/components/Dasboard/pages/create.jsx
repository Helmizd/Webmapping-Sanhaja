import React from 'react'

class Create extends React.Component {

    constructor(props){
        super(props)
        this.state={
            name:'',
            lastname:'',
            email:'',
            password:'',
            role:'2'
        }
        this.handleChange = this.handleChange.bind(this)
        this.createUser = this.createUser.bind(this)
    }
    createUser(e){
        e.preventDefault();
        document.getElementById('failUser').style.display = "none"
        document.getElementById('successUser').style.display = "none"
        let info = {...this.state}
        fetch(`http://127.0.0.1:3001/users/create`, {
      body: JSON.stringify(info),
      headers: { "content-type": "application/json" },
      method: "POST",
    })
      .then(async (result) => {
        result = await result.json();
        console.log(result)
        if (result.status == "success") {
            document.getElementById('successUser').style.display = "block"
            this.setState({name:'',lastname:'',email:'',password:'', role:''})
        }else{
          document.getElementById('failUser').style.display = "block"
        }
      })
      .catch((err) => {
          console.log("err", err);
          document.getElementById('failUser').style.display = "block"
        });
        setTimeout(()=>{
            document.getElementById('failUser').style.display = "none"
            document.getElementById('successUser').style.display = "none"
        },3000)
    }
    handleChange (evt) {
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
      }
    render(){
        return (
        <main className="page-content">
          <div className="container-fluid ">
          <div className="card " >
                <div className="card-body w-50" style={{float:"none",margin:"0 auto"}}>
                   
                    <div className="row">
                     
                        <div className="col-md-12">
                            <h2 className="py-3 text-center font-bold font-up blue-text">تسجيل حساب</h2>
                        </div>
                      
                    </div>

                    <form action="#" onSubmit={this.createUser}>
                                        <div className="form-group">
                                            <label htmlFor="name">: الأسم و اللقب </label>
                                            <div className="form-row">
                                            
                                                
                                                <div className="col">
                                                    <input type="text" className="form-control" placeholder="اللقب" name='lastname' value={this.state.lastname} onChange={(e) => {this.handleChange(e)}}/>
                                                </div>
                                                <div className="col">
                                                    <input type="text" className="form-control" placeholder="الأسم" name='name' value={this.state.name} onChange={(e) => {this.handleChange(e)}}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="mail"> : البريد الإلكتروني</label>
                                            <input type="email" className="form-control" id="mail" placeholder="البريد الإلكتروني" name='email' value={this.state.email} onChange={(e) => {this.handleChange(e)}} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password"> : كلمة السر</label>
                                            <input type="password" className="form-control" id="password" placeholder="كلمة السر" name='password' value={this.state.password} onChange={(e) => {this.handleChange(e)}}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Type">: الوظيفة </label>
                                            <select className="form-control" id="Type" name='role' value={this.state.role} onChange={(e) => {this.handleChange(e)}}>
                                            <option value='0'>مدير</option>
                                            <option value='1' >موظف</option>
                                            <option value='2' >مواطن</option>
                                            </select>
                                        </div>
                                        
                                        <div className="text-center">
                                        <button type="submit" className="btn btn-primary " >تسجيل</button>
                                        </div>
                                        <div id="successUser" class="alert alert-success" role="alert" style={{display:'none',marginTop:"20px"}}>
                                        تم تسجيل
                                        </div>
                                        <div id="failUser" class="alert alert-danger" role="alert" style={{display:'none',marginTop:"20px"}}>
                                        خطأ في تسجيل
                                        </div>
                                        
                    </form>
                  
                    
                   
                </div>
            </div>
          </div>
        </main>
    )
    }
};

export default Create;