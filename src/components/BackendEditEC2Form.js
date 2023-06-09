import React,{useContext} from 'react'
import { BackendEC2Context } from './BackendEC2'

import {encryptStorage1} from '../App'


const BackendEditEC2Form = ({demand_default,server_name_default,os_default,resource_default,subnet_default,check_default,demand_ChangeHandler,os_ChangeHandler,instance_type_ChangeHandler,handle_Update,cancel,ec2_Name_ChangeHandler,ip_ChangeHandler,subnet_ChangeHandler,handle_Update_DB,subnet}) => {
   


   
  const receiveData = useContext(BackendEC2Context)
  //console.log(receiveData)



 return <>
   

        <div className="modal fade form_modal" data-keyboard="false" data-backdrop="static" id="form_modal_edit_backend" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
          <button data-dismiss="modal" className="close" type="button" onClick={() => cancel()}>
              <span aria-hidden="true">×</span>
          </button>
              <form className="form" id="the_form">
              <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="user_displayName">申請人</label>
                          <input type="text" value={encryptStorage1.getItem('query5').cn} disabled={true} name="user_displayName" className="form-control" id="user_displayName"/>
                        </div>
                      </div> 

                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="employee_numnber">申請人員編</label>
                          <input type="text" value={encryptStorage1.getItem('query5').sAMAccountName} disabled={true} name="employee_numnber" className="form-control" id="employee_numnber"/>
                        </div>
                      </div> 

                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="employee_department">申請人部門</label>
                          <input type="text" value={encryptStorage1.getItem('query5').dn.split(",")[1].split('_')[1]} disabled={true} name="employee_numnber" className="form-control" id="employee_department"/>
                        </div>
                      </div> 

                     <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="demand">需求單單號</label>
                          <input type="text" name="demand" className="form-control" id="demand" onChange={demand_ChangeHandler} ref={demand_default}/>
                        </div>
                      </div> 



    
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="EC2_name">雲端主機名稱</label>
                          <input type="text" name="EC2_name" className="form-control" id="EC2_name" onChange={ec2_Name_ChangeHandler} ref={server_name_default}/>
                        </div>
                      </div>
                      

                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="ami">雲端主機作業系統</label>
                          <select name="ami" id="instance_type" className="form-control" onChange={os_ChangeHandler} ref={os_default}>
                            <option value="ami-006e00d6ac75d2ebb">Ubuntu 20.04 LTS</option>
                            <option value="ami-007855ac798b5175e">Ubuntu 22.04 LTS</option>
                            
                            <option value="ami-00c39f71452c08778">Amazon Linux 2023 </option>
                          </select>
                        </div>
                      
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="instance_type">雲端主機規格</label>
                          <select name="subnet" id="instance_type" className="form-control" onChange={instance_type_ChangeHandler} ref={resource_default}>
                              <option value="t1.micro">1vCPU 0.612GB Mem</option>
                              <option value="t2.nano">1vCPU 0.5GB Mem</option>
                              <option value="t2.micro">1vCPU 1GB Mem</option>
                          </select>
                        </div>
                    
                      </div>

                      

                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="subnet">網段</label>
                          <select name="subnet" id="subnet" className="form-control" onChange={subnet_ChangeHandler} ref={subnet_default}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="DMZ1">DMZ1</option>
                            <option value="DMZ2">DMZ2</option>
                          </select>
                        </div>
                   
          
                      </div>
                     
                
                       {(subnet === 'DMZ1' ||  subnet === 'DMZ2') &&
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <div className="form-check">
                              
                                <label className="form-check-label" htmlFor="exampleCheck1">對外IP</label>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={ip_ChangeHandler} ref={check_default} />
                          </div>

                        </div>
                       
                    

                      </div>
                
                    } 
                  
                      
                      
                      <div className="button-group">
                        <button type="button" id="save" className="btn btn-primary" onClick={() => handle_Update_DB()}>更新資料庫</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => cancel()}>取消</button>

                      </div>
                      
              </form>
          </div>
        </div>
      </div>
  
  
  </>
}

export default BackendEditEC2Form