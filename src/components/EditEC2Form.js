import React,{useContext} from 'react'
import { EC2Context } from './CreateEC2'
import {encryptStorage1} from '../App'
// import EditCounter from './EditCounter_'

const EditEC2Form = ({theId,theIndex,demand_default,server_name_default,os_default,disk_default,dynamic_default,resource_default,subnet_default,check_default,demand_ChangeHandler,os_ChangeHandler,disk_ChangeHandler,instance_type_ChangeHandler,handle_Update,cancel,ec2_Name_ChangeHandler,ip_ChangeHandler,subnet_ChangeHandler,ip,subnet
  ,counter,counter2,handle_Add_Disk2,handle_Remove_Disk,handle_Remove_Disk2,handle_Remove_Disk3,handleChange,handleChange2,ghost}) => {
    const receiveData = useContext(EC2Context)
    console.log(receiveData)
    console.log(counter)
    console.log(counter2)

    let elements = document.querySelectorAll('.the-form-row:not(.ghost)')
    console.log(elements)
    let new_elements = Object.values(elements)
    console.log(new_elements)
 return <>
      <div className="modal fade form_modal" data-keyboard="false" data-backdrop="static" id="form_modal_edit" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
 
        <div className="modal-dialog modal-lg">
          <div className="modal-content the-modal-content">
          <button data-dismiss="modal" className="close" type="button" onClick={() => cancel()}>
              <span aria-hidden="true">×</span>
          </button>
      
          
              <form className="form wrapper"  method="POST" id="the_form" onSubmit={handle_Update}>
                      
                      
                      <div className="form-row_backend">
                        <div className="form-group">
                          <label htmlFor="user_displayName">申請人</label>
                          <input type="text" value={encryptStorage1.getItem('query5').cn} disabled={true} name="user_displayName" className="form-control" id="user_displayName"/>
                        </div>
                      </div> 

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="employee_numnber">申請人員編</label>
                          <input type="text" value={encryptStorage1.getItem('query5').sAMAccountName} disabled={true} name="employee_numnber" className="form-control" id="employee_numnber"/>
                        </div>
                      </div> 

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="employee_department">申請人部門</label>
                          <input type="text" value={encryptStorage1.getItem('query5').dn.split(",")[1].split('_')[1]} disabled={true} name="employee_numnber" className="form-control" id="employee_department"/>
                        </div>
                      </div> 

                     <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="demand">需求單單號</label>
                          <input type="text" name="demand" className="form-control" id="demand" onChange={demand_ChangeHandler} ref={demand_default}/>
                        </div>
                      </div> 



    
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="EC2_name">主機名稱</label>
                          <input type="text" name="EC2_name" className="form-control" id="EC2_name" onChange={ec2_Name_ChangeHandler} ref={server_name_default}/>
                        </div>
                      </div>
                      

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="ami">主機作業系統</label>
                          <select name="ami" id="ami" className="form-control" onChange={os_ChangeHandler} ref={os_default}>
                            <option value="ami-0e515107fd2bcc7fe">Windows Server 2019</option>
                            <option value="ami-0d52744d6551d851e">Ubuntu 22.04 LTS</option>
                            <option value="ami-06a46da680048c8ae">CentOS 7</option>
                          </select>
                        </div>
                      
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="instance_type">主機規格</label>
                          <select name="subnet" id="instance_type" className="form-control" onChange={instance_type_ChangeHandler} ref={resource_default}>
                              <option value="t3.nano">t3.nano(2vCPUs 0.5GiB Mem)</option>
                              <option value="t3.micro">t3.micro(2vCPUs 1.0GiB Mem)</option>
                              <option value="t3.small">t3.small(2vCPUs 2.0GiB Mem)</option>
                              <option value="t3.medium">t3.medium(2vCPUs 4.0GiB Mem)</option>
                              <option value="t3.large">t3.large(2vCPUs 8.0GiB Mem)</option>
                              <option value="t3.xlarge">t3.xlarge(4vCPUs 16.0GiB Mem)</option>

                              <option value="t4g.nano">t4g.nano(2vCPUs 0.5GiB Mem)</option>
                              <option value="t4g.micro">t4g.micro(2vCPUs 1.0GiB Mem)</option>
                              <option value="t4g.small">t4g.small(2vCPUs 2.0GiB Mem)</option>
                              <option value="t4g.medium">t4g.medium(2vCPUs 4.0GiB Mem)</option>
                              <option value="t4g.large">t4g.large(2vCPUs 8.0GiB Mem)</option>
                              <option value="t4g.xlarge">t4g.xlarge(4vCPUs 16.0GiB Mem)</option>
                          </select>
                        </div>
                    
                      </div>

                      <div className="form-row">
                        <div className="form-group the_form-group disk-1">
                          <button onClick={handle_Add_Disk2} className="add_disk">新增硬碟</button>
                          <label>主機硬碟1</label>
                          <div className='d-flex'>
                            <input type="number" name='EC2_disk' placeholder="請輸入硬碟容量" onChange={disk_ChangeHandler} ref={disk_default} className="form-control" id="EC2_disk" min="8"/> 
                            <div className='gb'>GB</div> 
                          </div>
                        </div>           
                     </div>  

                     {/* receiveData.allEC2[theIndex].COUNTER */}
                
                     {  
                      
                      receiveData.allEC2[theIndex].COUNTER.map((c, index) => {
                        return <div className='form-row the_form-row' key={index}>
                            <div className="form-group the_form-group dynamic_disk" >  
                                    <button onClick={(e) => handle_Remove_Disk2(e,index)} className="remove_disk">移除硬碟</button>
                                    <label>主機硬碟</label>
                                    <div className='d-flex'>
                                        <input type="number" name="EC2_disk" ref={(element) => dynamic_default.current[index] = element} onChange={(e) => handleChange(e,index)} placeholder="請輸入硬碟容量"  className="form-control EC2_disk_dynamic"  id={`dynamic${index}`} min="8"></input>
                                        <div className='gb'>GB</div>      
                                    </div>               
                            </div> 
                       </div>
                      })}


                      {
                      counter2.map((c, index) => {
                          let start_point = receiveData.allEC2[theIndex].COUNTER.length + 2
                          console.log(start_point)

                          return <div className='form-row the_form-row' key={index}>

                        
                            <div className="form-group the_form-group dynamic_disk" >  
                            <button onClick={(e) => handle_Remove_Disk3(e,index)} className="remove_disk">移除硬碟</button>
                                    <label>主機硬碟</label>
                                    <div className='d-flex'>
                                        <input type="number" name="EC2_disk" value={c.EC2_disk || ''} onChange={(e) => handleChange2(e,index)} placeholder="請輸入硬碟容量"  className="form-control EC2_disk_dynamic" min="8"></input>
                                        <div className='gb'>GB</div> 
                                    </div>               
                            </div> 
                          </div>
                        }
                    )}    
                    


                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="subnet">網段</label>
                          <select name="subnet" id="subnet" className="form-control" onChange={subnet_ChangeHandler} ref={subnet_default}>
                            <option value="subnet-f20f8085">內部網段1(不可連外網)</option>
                            <option value="subnet-3406a06d">內部網段2(不可連外網)</option>
                            <option value="subnet-c30e81b4">內部網段1(可連外網)</option>
                            <option value="subnet-e507a1bc">內部網段2(可連外網)</option>
                            <option value="subnet-931d95e4">DMZ網段1(可連外網)</option>
                            <option value="subnet-6a00a333">DMZ網段2(可連外網)</option>
                          </select>
                        </div>
                   
          
                      </div>
                     
                
                      {(subnet === 'DMZ1' ||  subnet === 'DMZ2') &&
                      <div className="form-row">
                        <div className="form-group">
                          <div className="form-check">
                              
                                <label className="form-check-label" htmlFor="exampleCheck1">對外IP</label>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={ip_ChangeHandler} ref={check_default} />
                          </div>
                        </div>

                      </div>
                      }
                      
                      
                      
                      <div className="button-group">
                        <button type="submit" id="save" className="btn btn-primary">更新</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => cancel()}>取消</button>
                      </div> 
              </form>
          </div>
        </div>
      </div>
  </>
}

export default EditEC2Form