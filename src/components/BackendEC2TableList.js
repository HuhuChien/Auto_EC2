import React,{ useContext } from 'react'
import { BackendEC2Context } from './BackendEC2'

import BackendEC2TableSingle from './BackendEC2TableSingle';

const BackendEC2TableList = ({demand_apply,alert,tem_demand,deleteEC2,editEC2,response}) => {


  const receiveData = useContext(BackendEC2Context)
  let demand_obj
  //console.log(receiveData)



  try{
    if(tem_demand){
      demand_obj = JSON.parse(tem_demand);
    }
    

  }catch(error){
    console.log(error)
  }
  


  return <>

   

            {receiveData.length > 0 &&
                <table className="table create">
                  <thead className="">
                    <tr>
                      <th scope="col">需求單單號</th>
                      <th scope="col">申請人</th>
                      <th scope="col">申請人部門</th>
                      <th scope="col">主機名稱</th>
                      <th scope="col">主機作業系統</th>
                      <th scope="col">主機規格</th>
                      <th scope="col">主機硬碟</th>
                      <th scope="col">網段</th>
                      <th scope="col">對外IP</th>
                      <th scope="col">進階</th>
                    </tr>
                  </thead>
                  <tbody>

                        {receiveData.map((ec2,index) => {
                              console.log(ec2)
                              return <BackendEC2TableSingle key={ec2._id} {...ec2} deleteEC2={deleteEC2} editEC2={editEC2}/>
                                              
                        })

                        }

                  </tbody>
                </table>
            }

            {  alert &&
                 <div className="modal fade" id="backend_ModalCenter" tabIndex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                 <div className="modal-dialog modal-dialog-centered" role="document">
                   <div className="modal-content the-modal-content">
                     <div className="modal-header ">
                       <h5 className="modal-title" id="backend_title">提示</h5>
                     
                     </div>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                    </button>
                     <div className="modal-body">
                       無需求單號{demand_obj.demand}
                     </div>
                     <div className="modal-footer">
                       <button type="button" className="btn btn-secondary" data-dismiss="modal">關閉</button>
                 
                     </div>
                   </div>
                 </div>
               </div>

            }
   


  

  
  
  </>
    
  
}

export default BackendEC2TableList