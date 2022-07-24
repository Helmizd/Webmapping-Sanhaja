import React from "react";
import Mapcomp from './MapComp.jsx'


class Map extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            lastname:'',
            cin:'',
            type:'0',
            objectid:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitReclamation = this.submitReclamation.bind(this)
        this.child = React.createRef()
        this.updateMap = this.updateMap.bind(this)
    }
    
    handleChange (evt) {
        console.log('x')
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
      }

     showSidebar = () => {
        document.getElementById("sideBar").style.width = "100%";
      
       
      };

      submitReclamation(e){
        e.preventDefault();

        let info = {...this.state,user_id:this.props.user.id}
        console.log(info)
        fetch(`http://127.0.0.1:3001/reclamation`, {
            body: JSON.stringify(info),
            headers: { "content-type": "application/json" },
            method: "POST",
        })
        .then(async (result) => {
            result = await result.json();
            console.log(result)
            if (result.status == "success") {
                this.setState({name:'',lastname:'', cin:'', type:'0', objectid:''})
            }
            setTimeout(() => {
                this.updateMap()
            }, 1);
            
        })
        .catch((err) => {
            console.log("err", err);

        });
        
        
    }

    updateMap = () => {
        
        this.child.current.updatePosition()
      }
    render(){
        return(
                <div className="container-fluid Full-height">
                      <div className="row Full-height">
                      { this.props.logged ? <div className="container col col-lg-2">
                            <div className="row Full-height">
                            <div className="card col card-special" id="sideBar" >
                                <div className="card-body">
                                    <form action="#" onSubmit={this.submitReclamation}>
                                        <div className="form-group">
                                            <label htmlFor="name"> : الاسم و اللقب</label>
                                            <div className="form-row">
                                            
                                                
                                                <div className="col">
                                                    <input type="text" className="form-control" placeholder="اللقب" name='lastname' value={this.state.lastname} onChange={(e) => {this.handleChange(e)}} />
                                                </div>
                                                <div className="col">
                                                    <input type="text" className="form-control" placeholder="لاسم" name='name' value={this.state.name} onChange={(e) => {this.handleChange(e)}} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cin"> : رقم بطاقة التعريف الوطنية </label>
                                            <input type="text" className="form-control" id="cin" placeholder="01234567" name='cin' value={this.state.cin} onChange={(e) => {this.handleChange(e)}} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Type"> : المجال</label>
                                            <select className="form-control" id="Type" name='type' value={this.state.type} onChange={(e) => {this.handleChange(e)}}>
                                            <option value="0">التنوير العمومي</option>
                                            <option value="1">الطرقات</option>
                                            <option value="2">الطرقات الرئيسية</option>
                                            <option value="3">العمران</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="id"> : المعرف  </label>
                                            <input type="text" className="form-control" id="id" placeholder="" name='objectid' value={this.state.objectid} onChange={(e) => {this.handleChange(e)}}/>
                                        </div>
                                        <div className="text-center">
                                        <button type="submit" className="btn btn-primary ">ارسال</button>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>

                            </div>
                        </div> :''}
                        <Mapcomp ref={this.child} />
                     </div>
               
                </div>
            )
    }
}
export default Map