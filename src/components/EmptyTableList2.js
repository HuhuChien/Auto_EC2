import React,{useContext} from 'react'
import { ApplyEC2Context } from './ApplyEC2'
const EmptyTableList2 = ({demand_apply,alert,tem_demand}) => {


  const receiveData = useContext(ApplyEC2Context)
  let demand_obj
  console.log(receiveData)

  
  try{
    demand_obj = JSON.parse(tem_demand);
  
    }catch(error){
      console.log(error)
    }
    
  return <>
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
              <th scope="col">進階</th>
            </tr>
          </thead>
          <tbody className=''>
            <tr>
                <td className='no-data'>無資料</td>
            </tr>
               
    
          </tbody>
        </table>
        { alert &&
           <div className="modal fade" id="apply_demand_ModalCenter" tabIndex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
           <div className="modal-dialog modal-dialog-centered" role="document">
             <div className="modal-content the-modal-content">
               <div className="modal-header">
                 <h5 className="modal-title" id="apply_demand_title">提示</h5>
                
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

export default EmptyTableList2