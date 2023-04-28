import React,{useContext,useState} from 'react'
import { EC2Context } from './CreateEC2'
import axios from 'axios';
//import $ from 'jquery'; 


const EC2Form = ({demand,demand_default,server_name_default,os_default,resource_default,subnet_default,check_default,
  demand_ChangeHandler,ec2_Name_ChangeHandler,os_ChangeHandler,instance_type_ChangeHandler,handle_Submit,
  cancel,ip_ChangeHandler,subnet_ChangeHandler}) => {

const receiveData = useContext(EC2Context)
  const [loading,setLoading] = useState(false)
  const handle_Submit_DB = (e) => {
  
    let payload = receiveData.allEC2
    const url = 'http://localhost:5020/task'
    receiveData.allEC2.forEach((item,index) => {
      console.log('ss')
     axios.post(url,{
        demand:payload[index].DEMAND,
        server_name:payload[index].EC2NAME,
        ami:payload[index].OS,
        instance_type:payload[index].RESOURCE,
        subnet:payload[index].SUBNET,
      })
      .then(function (response) {
          setLoading(true)
          console.log("cool")
          console.log(response);
      
        })
      .catch(function (error) {
          console.log(error);
        })
      .finally(() => {
        setLoading(false)
      })
     
    })
    console.log('no')
  }




  return <>
      
      <button type="button" className="main start" data-toggle="modal" data-target=".form_modal" id="click-modal">開始建立主機</button>
      {receiveData.allEC2.length > 0 && 
      <button type="button" className="main" onClick={handle_Submit_DB}>送出</button>
      }


      
      <div className="modal fade form_modal" id="form_modal" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
          <button data-dismiss="modal" className="close" type="button" onClick={() => cancel()}>
              <span aria-hidden="true">×</span>
          </button>
              <form className="form" method="POST" id="the_form" onSubmit={handle_Submit}>
    


                   
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="demand">需求單單號</label>
                          {
                            demand ? <input type="text" value={demand} name="demand" className="form-control" id="demand" onChange={demand_ChangeHandler} ref={demand_default}/>
                            :   <input type="text" name="demand" value="" className="form-control" id="demand" onChange={demand_ChangeHandler} ref={demand_default}/>
                          }
                        
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
                     
                
                      {(receiveData.subnet === 'DMZ1' ||  receiveData.subnet === 'DMZ2') &&
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
                        <button type="submit" id="save" className="btn btn-primary">儲存</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => cancel()}>取消</button>

                      </div>
                      
              </form>
          </div>
        </div>
      </div>


    


</>
}

export default EC2Form