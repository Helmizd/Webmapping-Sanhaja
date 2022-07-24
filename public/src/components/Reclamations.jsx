import React from 'react'

class Reclamation extends React.Component {

    constructor(props){
        super(props)
        this.state={
            reclamations:[],
            name:'',
            lastname:'',
            cin:'',
            type:'0',
            objectid:'',
            reclamationID:0
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateReclamation = this.updateReclamation.bind(this)

        this.getReclamation = this.getReclamation.bind(this)
        this.deleteReclamation = this.deleteReclamation.bind(this)
    }
    getReclamation(){
        console.log(this.props.user.id)
        fetch(`http://127.0.0.1:3001/reclamation/user/${this.props.user.id}`, {
            method: "GET",
          })
            .then(async (result) => {
              result = await result.json();
                console.log(result)
              if (result ) {
                  if(Array.isArray(result) && result.length >= 0 ){
                    console.log(result)
                      if(result.length > 0) this.setState({ reclamations: result });
                      else this.setState({ reclamations: [] })
                  } 
                 
              }
            })
            .catch((err) => console.log("err", err));
    }
    deleteReclamation(id){
        fetch(`http://127.0.0.1:3001/reclamation/delete/${id}`, {
            method: "GET",
          })
            .then(async (result) => {
              result = await result.json();

                this.getReclamation()              
              
            })
            .catch((err) => console.log("err", err));
        
    }
    convertDate(value){
        if(!value) return '';
        let myDate = new Date(value)
        let Month = myDate.getMonth()+1
        return myDate.getDate() +"/" + Month + '/' + myDate.getFullYear()
    }
    componentDidMount(){
        this.getReclamation()
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
            }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }
    }
    handleChange (evt) {
        console.log('x')
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
      }
    updateReclamation(e){
        e.preventDefault();

        let info = {...this.state,id:this.state.reclamationID}
        console.log(info)
        fetch(`http://127.0.0.1:3001/reclamation/update`, {
            body: JSON.stringify(info),
            headers: { "content-type": "application/json" },
            method: "POST",
        })
        .then(async (result) => {
            result = await result.json();
            console.log(result)
            if (result[0]) {
                this.setState({name:'',lastname:'', cin:'', type:'0', objectid:''})
                this.getReclamation()
                document.getElementById('closeModal').click()
            }
            
        })
        .catch((err) => {
            console.log("err", err);

        });
        
        
    }
    render(){
        return (
        <main className="page-content">
          <div className="container-fluid">
          <div className="card">
                <div className="card-body">
                   
                    <div className="row">
                     
                        <div className="col-md-12">
                            <h2 className="py-3 text-center font-bold font-up blue-text">شكاوي</h2>
                        </div>
                      
                    </div>

                    <table className="table table-hover  mb-0">
                      
                        <thead>
                            <tr>
                                <th className="th-lg"><a href="">حذف</a></th>
                                <th className="th-lg"><a href="">تعديل</a></th>
                                <th className="th-lg"><a href="">تاريخ شكوى</a></th>
                                <th className="th-lg"><a href="">أسم المجال</a></th>
                                <th className="th-lg"><a href="">المجال</a></th>
                                <th className="th-lg"><a href="">رقم بطاقة التعريف الوطنية</a></th>
                                <th className="th-lg"><a href="">اللقب</a></th>
                                <th className="th-lg"><a href="">الأسم</a></th>
                                <th scope="row"><a href="">#</a></th>
                            </tr>
                        </thead>

                        <tbody>
                        {this.state.reclamations.map(( reclamation, index ) => {
                            return (
                                <tr key={index}>
                                <td ><button type="button" class="btn btn-danger"  onClick={()=>this.deleteReclamation(reclamation.id)}>مسح</button></td>
                                <td ><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#formModal" onClick={()=>this.setState({reclamationID:reclamation.id})} >تعديل</button></td>
                                <td>{this.convertDate(reclamation.date_rec)}</td>
                                <td>{reclamation.nom}</td>
                                <td>{reclamation.type == '0' ? 'التنوير العمومي' : reclamation.type == '1' ? 'الطرقات' : reclamation.type == '2' ? 'الطرقات الرئيسية' : 'العمران'}</td>
                                <td>{reclamation.cin}</td>
                                <td>{reclamation.lastname}</td>
                                <td>{reclamation.name}</td>
                                <td scope="row" >{index}</td>
                                </tr>
                            );
                            })}
                        </tbody>
                     
                    </table>
                  
                    
                   
                </div>
            </div>
          </div>
          <div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header border-bottom-1">
                <button type="button" class="close" data-dismiss="modal" id="closeModal" style={{marginLeft:'0'}} aria-label="Close">
                    <span aria-hidden="true" style={{fontSize:'20'}}>&times;</span>
                    </button>
                    <h3 class="modal-title" id="exampleModalLabel" >تعديل</h3>
                    
                </div>
                <form action="#" onSubmit={this.updateReclamation}>
                    <div class="modal-body">
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
                    </div>
                </form>
                </div>
            </div>
            </div>
        </main>
    )
    }
};

export default Reclamation;