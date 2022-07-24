import React from 'react'

class Reclamation extends React.Component {

    constructor(props){
        super(props)
        this.state={
            reclamations:[]
        }
        this.getReclamation = this.getReclamation.bind(this)
        this.moveToIntervenir = this.moveToIntervenir.bind(this)
    }
    getReclamation(){
        fetch(`http://127.0.0.1:3001/reclamation`, {
            method: "GET",
          })
            .then(async (result) => {
              result = await result.json();

              if (result ) {
                  if(Array.isArray(result) && result.length > 0 ){
                      if(result.length > 0) this.setState({ reclamations: result });
                  } 
                 
              }
            })
            .catch((err) => console.log("err", err));
    }
    moveToIntervenir(id){
        fetch(`http://127.0.0.1:3001/reclamation/move/${id}`, {
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
                            <th className="th-lg"><a href="">أرسال لتدخل</a></th>
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
                                    <td><i className="fa fa-paper-plane moveIcon" onClick={()=>this.moveToIntervenir(reclamation.id)}></i></td>
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
        </main>
    )
    }
};

export default Reclamation;