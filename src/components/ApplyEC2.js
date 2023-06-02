import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios';
import ApplyEC2TableList from './ApplyEC2TableList';
import Logout from './Logout';
import EmptyTableList2 from './EmptyTableList2';
import  secureLocalStorage  from  "react-secure-storage";
import {encryptStorage1} from '../App'
import $ from 'jquery'; 
export const ApplyEC2Context = React.createContext()


const ApplyEC2 = ({query}) => {
  const [response,setResponse] = useState([])
  const [demand_apply,setDemand_apply] = useState('')
  const [tem_demand,setTem_demand] = useState('')
  const [alert,setAlert] = useState(false)
  const demand_request_default = useRef(null)




  useEffect(() => {
    secureLocalStorage.removeItem('all2')
    secureLocalStorage.removeItem('demand2')
    const data = JSON.parse(secureLocalStorage.getItem('all2'))
    const demand = JSON.parse(secureLocalStorage.getItem('demand2'))
    
    if(data){
      setResponse(data)
    } 
    if(demand){
      setDemand_apply(demand)
      demand_request_default.current.value = demand
    }
    

    
   
  }, []);


  useEffect(() => {
   
    secureLocalStorage.setItem('all2', JSON.stringify(response));
    secureLocalStorage.setItem('demand2', JSON.stringify(demand_apply));
  }, [response,demand_apply]);

const fetchData = async() => {
  const url = "http://localhost:5020/demand"
  try{
    const data = await axios.post(url,{
      demand:demand_apply
    })
    console.log(data)
    setResponse(data.data)
    console.log(response)
    if(data.data.length < 1 && demand_apply !== ''){
      setTem_demand(data.config.data)  
      setAlert(true)
      $('#apply_demand_ModalCenter').modal('show')
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

  return <>
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
    <button type="submit" id="demand_save" className="main">確認</button>
 
</form>


<ApplyEC2Context.Provider value={response} >
      {response.length > 0 ?  <ApplyEC2TableList  />
      : <EmptyTableList2 tem_demand={tem_demand} demand_apply={demand_apply} alert={alert}/> 
    }
     
      
    
</ApplyEC2Context.Provider>
</div> 
  </>
   
  
}

export default ApplyEC2