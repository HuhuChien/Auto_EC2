import React,{useEffect} from 'react'
import {encryptStorage1} from '../App'
//import $ from 'jquery'; 


const EC2Form = ({demand,demand_default,server_name_default,os_default,disk_default,dynamic_disks_default,resource_default,subnet_default,check_default,
  demand_ChangeHandler,ec2_Name_ChangeHandler,os_ChangeHandler,disk_ChangeHandler,instance_type_ChangeHandler,handle_Submit,
  cancel,ip_ChangeHandler,subnet_ChangeHandler,subnet,counter,handle_Add_Disk,handle_Remove_Disk,handleChange}) => {

//const receiveData = useContext(EC2Context)
//console.log(receiveData)



//預設Disk1的大小為30GB
useEffect(() => {
  
  disk_default.current.value = 30
   // eslint-disable-next-line
},[])




  return <>
      
 


      
      <div className="modal fade form_modal" id="form_modal" tabIndex="-1" data-backdrop="static" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        
        <div className="modal-dialog modal-lg">
          <div className="modal-content the-modal-content">
          <button data-dismiss="modal" className="close" type="button" onClick={cancel}>
              <span aria-hidden="true">&times;</span>
          </button>
           
              <form className="form wrapper" method="POST" id="the_form" onSubmit={handle_Submit}>
       
                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group">
                          <label htmlFor="user_displayName">申請人</label>
                          <input type="text" value={encryptStorage1.getItem('query5').cn} disabled={true} name="user_displayName" className="form-control" id="user_displayName"/>
                        </div>
                      </div> 

                      <div className="form-row the_form-row">
                        <div className="form-group  the_form-group">
                          <label htmlFor="employee_numnber">申請人員編</label>
                          <input type="text" value={encryptStorage1.getItem('query5').sAMAccountName} disabled={true} name="employee_numnber" className="form-control" id="employee_numnber"/>
                        </div>
                      </div> 

                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group">
                          <label htmlFor="employee_department">申請人部門</label>
                          <input type="text" value={encryptStorage1.getItem('query5').dn.split(",")[1].split('_')[1]} disabled={true} name="employee_numnber" className="form-control" id="employee_department"/>
                        </div>
                      </div> 
                   
                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group">
                          <label htmlFor="demand">需求單單號</label>
                          {
                            demand ? <input type="text" value={demand} name="demand" className="form-control" id="demand" onChange={demand_ChangeHandler} ref={demand_default}/>
                            :   <input type="text" name="demand" value="" className="form-control" id="demand" onChange={demand_ChangeHandler} ref={demand_default}/>
                          }
                        
                        </div>
                      </div> 


                      <div className="form-row the_form-row">
                        <div className="form-group  the_form-group">
                          <label>主機名稱</label>
                          <input type="text" name="EC2_name" className="form-control" id="EC2_name" onChange={ec2_Name_ChangeHandler} ref={server_name_default}/>
                        </div>
                      </div>                 

                      <div className="form-row the_form-row">
                        <div className="form-group  the_form-group">
                          <label>主機作業系統</label>
                          <select name="ami" id="ami" className="form-control" onChange={os_ChangeHandler} ref={os_default}>
                            <option value="ami-0e515107fd2bcc7fe">Windows Server 2019</option>
                            <option value="ami-0d52744d6551d851e">Ubuntu 22.04 LTS</option>
                            <option value="ami-06a46da680048c8ae">CentOS 7</option>
                          
                          </select>
                        </div>
                      </div>


                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group disk-1">
                          <button onClick={handle_Add_Disk} className="add_disk">新增硬碟</button>
                          <label>主機硬碟1</label>
                          <div className='d-flex'>
                            <input type="number" name='EC2_disk' placeholder="請輸入硬碟容量" onChange={disk_ChangeHandler} ref={disk_default} className="form-control" id="EC2_disk" min="8"/> 
                            <div className='gb'>GB</div> 
                          </div>
                        </div>           
                      </div>  

                      {counter.map((c, index) => 
                    
                          <div className='form-row the_form-row'  key={index}>
                            <div className="form-group the_form-group dynamic_disk" >
                              
                            <button onClick={(e) => handle_Remove_Disk(e,index)} className="remove_disk" >移除硬碟{index+2}</button>
                                    <label>主機硬碟{index + 2}</label>
                                    <div className='d-flex'>
                                        <input type="number" name="EC2_disk" ref={dynamic_disks_default} value={c.EC2_disk || ''} onChange={(e) => handleChange(e,index)} placeholder="請輸入硬碟容量"  className="form-control EC2_disk_dynamic"  id={`dynamic${index}`} min="8"></input>
                                        <div className='gb'>GB</div> 
                                    </div>
                
                            </div> 
                          </div>
                      
                     

                    )} 

                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group">
                          <label>主機規格</label>
                          <select name="instance_type" id="instance_type" className="form-control" onChange={instance_type_ChangeHandler} ref={resource_default}>
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

                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group">
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
                     
                       
                      {/* {(subnet === 'DMZ1' || subnet === 'DMZ2') &&
                      <div className="form-row the_form-row">
                        <div className="form-group col-md-4">
                          <div className="form-check">
                              
                                <label className="form-check-label" htmlFor="exampleCheck1">對外IP</label>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={ip_ChangeHandler} ref={check_default} />
                          </div>

                        </div>
                       
                    

                      </div>
                      }   */}
                      <div className="button-group">
                                <button type="submit" id="save" className="btn btn-primary">儲存</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={cancel}>取消</button>
                      </div> 
               
                      
              </form>
            
          </div>
        </div>
      </div>


    


</>
}

export default EC2Form