import React,{useEffect,useState,useRef,useReducer} from 'react'
import axios from 'axios';
import BackendEC2TableList from './BackendEC2TableList';
import BackendEditEC2Form from './BackendEditEC2Form'
import ClipLoader from "react-spinners/ClipLoader";
import secureLocalStorage  from  "react-secure-storage";
import Logout from './Logout';
import {encryptStorage1} from '../App'
import $ from 'jquery'; 
export const BackendEC2Context = React.createContext()


const BackendEC2 = ({query}) => {
  const [response,setResponse] = useState([])
  const [demand_apply,setDemand_apply] = useState('')
  const [tem_demand,setTem_demand] = useState('')
  const [alert,setAlert] = useState(false)
  const [loading,setLoading] = useState(false)
  
 

  const [theId,setTheid] = useState('')
  const [demand,setDemand] = useState('')
  const [ec2Name,setEc2Name] = useState('')
  const [os,setOS] = useState('ami-006e00d6ac75d2ebb')
  const [resource,setResource] = useState('t1.micro')
  const [subnet,setSubnet] = useState('A')
  const [ip,setIp] = useState(false)



  const demand_request_default = useRef(null)
  const demand_default = useRef(null)
  const server_name_default = useRef(null)
  const subnet_default = useRef(null)
  const os_default = useRef(null)
  const resource_default = useRef(null)
  const check_default = useRef(null)
  const search_default = useRef(null)
  const spinner_default = useRef(null)

  

//將DMZ1、DMZ2帶IP轉換成普通subnet使用

  useEffect(() => {
    if(subnet !== 'DMZ1' && subnet !== 'DMZ2'){
      setIp(false)
    }
   

  },[subnet])
  
  useEffect(() => {
    secureLocalStorage.removeItem('all3')
    secureLocalStorage.removeItem('demand3')
    const data = JSON.parse(secureLocalStorage.getItem('all3'))
    const demand = JSON.parse(secureLocalStorage.getItem('demand3'))
    console.log(demand)
    if(data){
      setResponse(data)
    } 

    if(demand){
      setDemand_apply(demand)
      demand_request_default.current.value = demand
     
    }
   
  }, []);


  useEffect(() => {
   
    secureLocalStorage.setItem('all3', JSON.stringify(response));
    secureLocalStorage.setItem('demand3', JSON.stringify(demand_apply));
   
  }, [response,demand_apply]);

const fetchData = async() => {
  const url = "http://localhost:5020/demand"
  try{
    const data = await axios.post(url,{
      demand:demand_apply
    })
    setResponse(data.data)

    if(data.data.length < 1 && demand_apply !== ''){
      setTem_demand(data.config.data)  
      setAlert(true)
      $('#backend_ModalCenter').modal('show')
    } else {
      setAlert(false)
    }

  }catch(error){
    console.log(error)
  }
}


const demand_apply_ChangeHandler = (e) => {
  setDemand_apply(e.target.value)
}



const handle_Demand_Request = (e) => {
  e.preventDefault()
  fetchData()
}





const demand_ChangeHandler = (e) => {
  setDemand(e.target.value)
}


const ec2_Name_ChangeHandler = (e) => {
  setEc2Name(e.target.value)
}

const os_ChangeHandler = (e) => {
  setOS(e.target.value)
  console.log(e.target.value)
}

const instance_type_ChangeHandler = (e) => {
  setResource(e.target.value)
  console.log(e.target.value)
}

const subnet_ChangeHandler = (e) => {
  setSubnet(e.target.value)

}



const ip_ChangeHandler = (e) => {
  setIp(!ip)

}




const cancel = (e) => {
   //檢查欄位是否填完整
   server_name_default.current.classList.remove('alarm')
   demand_default.current.classList.remove('alarm') 
   //要將表格欄位回復預設值
   demand_default.current.value = demand
   server_name_default.current.value = ''
   os_default.current.value = 'ami-006e00d6ac75d2ebb'
   resource_default.current.value = 't1.micro'
   subnet_default.current.value = 'A'

   //要將state回復預設值
  
   setEc2Name('')
   setOS('ami-006e00d6ac75d2ebb')
   setResource('t1.micro')
   setSubnet('A')
   setIp(false)
   setTheid('')
  
}




//刪除按鈕
const deleteEC2 = async(_id) => {
  axios.defaults.withCredentials = true //一定要有這行，解決reload後，無法刪除問題
  let isExecuted = window.confirm("確定刪除?");
  if (isExecuted) {
    const url = `http://localhost:5020/delete_ec2/${_id}`
  
    console.log('done0')


   await new Promise((resolve, reject) => {
        //resolve(setLoading(true))
        setLoading(true)
        resolve(axios.delete(url));

        console.log('done1');
      })


  await new Promise((resolve, reject) => {
      const newEC2s = response.filter((item) => 
        item._id !== _id
      )
      setTimeout(() => {
          resolve(setResponse(newEC2s));
          resolve(setLoading(false))
         
        },2000)
      
     
      })
 
  
  } else {
    console.log('nooo')
  }

} 


//修改按鈕
const editEC2 = async(_id) => {
 
  const edit_EC2 = response.find((item) => 
  item._id === _id
)

  
  await $('#form_modal_edit_backend').modal('show')
  
  demand_default.current.value = edit_EC2.demand
  server_name_default.current.value = edit_EC2.server_name
  os_default.current.value = edit_EC2.ami
  resource_default.current.value = edit_EC2.instance_type
  subnet_default.current.value = edit_EC2.subnet



  setTheid(_id)
  setDemand(edit_EC2.demand)
  setEc2Name(edit_EC2.server_name)
  setOS(edit_EC2.ami)
  setResource(edit_EC2.instance_type)
  setSubnet(edit_EC2.subnet)
  setIp(edit_EC2.ip) 



  if (subnet_default.current.value === 'DMZ1' || subnet_default.current.value === 'DMZ2'){
    check_default.current.checked = edit_EC2.ip
  
   } 





 }

//更新資料庫按鈕
const handle_Update_DB = async() => {
  try{
    axios.defaults.withCredentials = true
    const url = `http://localhost:5020/update_ec2/${theId}`
    const url2 = `http://localhost:5020/demand/${demand_apply}`
    const updated_data = {
      demand:demand,
      server_name:ec2Name,
      ami:os,
      instance_type:resource,
      subnet:subnet,
      ip:ip,
    }

    //更新資料庫
    await setLoading(true)
   
    await axios.put(url,updated_data)

    //更新前端
    await window.$('#form_modal_edit_backend').modal('hide')
    const new_response = await axios.get(url2)


    await new Promise((resolve, reject) => {
        //要將state回復預設值
        setTheid('')
        setEc2Name('')
        setOS('ami-006e00d6ac75d2ebb')
        setResource('t1.micro')
        setSubnet('A')
        setIp(false)
        console.log('done4')
      setTimeout(() => {
        setResponse(new_response.data)
        resolve(setLoading(false));
      },500)
   

    })





    /*
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(window.alert('資料已完成修改，並更新資料庫'));
      },800)
 
   })
   */



  }catch(error){
    console.log(error)
  }
  
}


  return <>
{/* 只有系統管理課的同仁可以進入此路徑/backend */}
{encryptStorage1.getItem('query5').dn.split(',')[1] === 'OU=MLH_系統管理' &&

<div>
    <div className='bar_ad_settings'>
        <div className="username">{
         encryptStorage1.getItem('query5').sAMAccountName + ' ' +
         encryptStorage1.getItem('query5').displayName
        }</div> 
        <Logout />
    </div>
    <div className="apply_container">
      <form className="form" method="POST" id="the_form_demand" onSubmit={handle_Demand_Request}>
      
      <input type="text" placeholder='需求單單號' ref={demand_request_default} name="demand_request" className="form-control demand_input" id="demand" onChange={demand_apply_ChangeHandler} />
      <button type="submit" id="demand_save_backend" className="main">確認</button>
      
      </form>

    
  <BackendEC2Context.Provider value={response} >
    
      
      
        <BackendEC2TableList demand_apply={demand_apply} alert={alert} tem_demand={tem_demand} deleteEC2={deleteEC2} editEC2={editEC2}/>

        {loading && <div className="clip_loader2"><ClipLoader id="ClipLoader" color="#36d7b7" size="100px"/></div>}



      <BackendEditEC2Form demand_default={demand_default} server_name_default={server_name_default} os_default={os_default} resource_default={resource_default} subnet_default={subnet_default} check_default={check_default} demand_ChangeHandler={demand_ChangeHandler} ec2_Name_ChangeHandler={ec2_Name_ChangeHandler} os_ChangeHandler={os_ChangeHandler} instance_type_ChangeHandler={instance_type_ChangeHandler}  subnet_ChangeHandler={subnet_ChangeHandler}  
        ip_ChangeHandler={ip_ChangeHandler} cancel={cancel} subnet={subnet} handle_Update_DB={handle_Update_DB}/> 
      
      

      
  </BackendEC2Context.Provider>
    </div> 
</div>
}
  </>
  
}

export default BackendEC2