import React from 'react'


class Intervenir extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            intervention : []
        }
        
    }
    getInterventions(){

        fetch(`http://127.0.0.1:3001/intervention`, {
            method: "GET",
          })
            .then(async (result) => {
              result = await result.json();

              if (result ) {
                  console.log(result)
                  if(Array.isArray(result) && result.length > 0 ){
                      if(result.length > 0) this.setState({ intervention: result });
                  } 
                 
              }
            })
            .catch((err) => console.log("err", err));
    }
    convertDate(value){
        if(!value) return '';
        let myDate = new Date(value)
        let Month = myDate.getMonth()+1
        return myDate.getDate() +"/" + Month + '/' + myDate.getFullYear()
    }
    moveToDone(id){
        fetch(`http://127.0.0.1:3001/intervention/done/${id}`, {
            method: "GET",
          })
            .then(async (result) => {
              result = await result.json();

              if (result ) {
                  console.log(result)
                  this.getInterventions()
              }
            })
            .catch((err) => console.log("err", err));
    }
    componentDidMount(){
      
        this.getInterventions()
    }
    render(){ 

        return (
        <main className="page-content">
          <div className="container-fluid">
          <div className="card">
                <div className="card-body">
                   
                    <div className="row">
                     
                        <div className="col-md-12">
                            <h2 className="py-3 text-center font-bold font-up blue-text">تدخلات</h2>
                        </div>
                      
                    </div>

                    <table className="table table-hover  mb-0">
                      
                        <thead>
                            <tr>
                            <th className="th-lg customAlign"><a href="">تدخل</a></th>
                                <th className="th-lg"><a href=""> تاريخ الانتهاء</a></th>
                                <th className="th-lg"><a href="">تاريخ البداية</a></th>
                                <th className="th-lg"><a href="">أسم المجال</a></th>
                                <th className="th-lg"><a href="">المجال</a></th>
                                <th className="th-lg"><a href="">حالة</a></th>
                                <th scope="row"><a href="">#</a></th>
                            </tr>
                        </thead>

                        <tbody>
                        {this.state.intervention.map(( intervention, index ) => {
                            return (
                                <tr key={index}>
                                    {intervention.statut == "1"? <td className='customAlign'><i className="fa fa-check-circle movetoDoneIcon" ></i></td> : <td className='customAlign'><button type="button" class="btn btn-warning"  onClick={()=>this.moveToDone(intervention.id)}>أكتملت المعالجة</button></td>}
                                    <td>{this.convertDate(intervention.date_fin)}</td>
                                    <td>{this.convertDate(intervention.date_debut)}</td>
                                    <td>{intervention.nom}</td>
                                    <td>{intervention.type == '0' ? 'التنوير العمومي' : intervention.type == '1' ? 'الطرقات' : intervention.type == '2' ? 'الطرقات الرئيسية' : 'العمران'}</td>
                                    <td>{intervention.statut == '0' ? 'أعمال جارية' :'تمت المعالجة'}</td>
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

export default Intervenir;