//rafce
import React,{ useState, useEffect,useRef,useReducer } from 'react'
import axios from 'axios';
import EC2TableList from './EC2TableList'
import reducer from '../reducer.js';
import EC2Form from './EC2Form';
import { v4 as uuidv4 } from 'uuid';
import EmptyTableList from './EmptyTableList';
import EditEC2Form from './EditEC2Form'
import SearchEC2TableList from './SearchEC2TableList';
import Search from './Search';
import Logout from './Logout';
import ClipLoader from "react-spinners/ClipLoader";
import {encryptStorage1} from '../App'
import $ from 'jquery'; 



export const EC2Context = React.createContext()


const CreateEC2 = ({setQuery}) => {
  const [theId,setTheid] = useState('')
  const [demand,setDemand] = useState('')
  const [ec2Name,setEc2Name] = useState('')
  const [os,setOS] = useState('ami-006e00d6ac75d2ebb')
  const [disk,setDisk] = useState(30)
  const [resource,setResource] = useState('t1.micro')
  const [subnet,setSubnet] = useState('A')
  const [ip,setIp] = useState(false)
  const [edit,setEdit] = useState(false)
  const [loading,setLoading] = useState(false)
  const [counter, setCounter] = useState([])
  const [counter2, setCounter2] = useState([])
  const [query2,setQuery2] = useState('')
  const [query3,setQuery3] = useState([])
  const [theIndex,setTheindex] = useState('')
  const [triggerNext, setTriggerNext] = useState(0);
  const [triggerPrevious, setTriggerPrevious] = useState(0);
  const [loggin_user,set_Loggin_user] = useState('')
  const [disabled,setDisabled] = useState(false) 

  const demand_default = useRef(null)
  const server_name_default = useRef(null)
  const os_default = useRef(null)
  const disk_default = useRef(null)
  const dynamic_default = useRef([])
  const resource_default = useRef(null)
  const subnet_default = useRef(null)
  const check_default = useRef(null)
  const search_default = useRef(null)
  const spinner_default = useRef(null)

  



  let defaultState = {
    allEC2: [],

    }


  const [state,dispatch] = useReducer(reducer,defaultState)
 
  //前端主機清單及頁面右上角的AD資訊
  useEffect(() => {
    //windlow.localStorage.removeItem('all')
    //window.localStorage.clear();//重新整理和關閉session  效果會衝突
   

    const data = JSON.parse(sessionStorage.getItem('all'))
    const data2 = JSON.parse(sessionStorage.getItem('query4'))
    console.log(data)
    if(data){
      state.allEC2 = data.allEC2
    } else {
      return
    }

    if(data2){
      set_Loggin_user(data2)
    }

 // eslint-disable-next-line
  },[]);  

  useEffect(() => {
  
    sessionStorage.setItem('all', JSON.stringify(state));
   
    setDemand(demand_default.current.value)
    setEc2Name(server_name_default.current.value)

  }, [state,state.allEC2]);
/*
  useEffect(() => {

    sessionStorage.setItem('all', JSON.stringify(state));
   
    setDemand(demand_default.current.value)
    setEc2Name(server_name_default.current.value)
  }, [state,state.allEC2,demand,ec2Name,os,resource,disk,subnet,ip]);
*/




  useEffect(() => {
   
    setQuery(state)
  },[state.allEC2,setQuery,state])
 




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

  const disk_ChangeHandler = (e) => {
  
    setDisk(e.target.value)
    
   
    console.log(e.target.value)
}
  
  const instance_type_ChangeHandler = (e) => {
      setResource(e.target.value)
      console.log(e.target.value)
  }


  
 

  const subnet_ChangeHandler = (e) => {
   
    setSubnet(e.target.value)
    
    if(subnet !== 'DMZ1' || subnet !== 'DMZ2'){
      setIp(false)
    }

    //dispatch({type:"SUBNET_UPDATE",payload:e.target.value}) //選DMZ時，會出現IP選項是否打勾
   
}




  const ip_ChangeHandler = (e) => {
  setIp(!ip)
}

//增加硬碟欄位
const handle_Add_Disk = (e) => {

  e.preventDefault()

  console.log('add_disk')
  setCounter([...counter,{}]);
  console.log(counter)
};


const handle_Add_Disk2 = (e) => {

  e.preventDefault()

  console.log('add_disk2')
  setCounter2([...counter2,{}]);
  console.log(counter2)

};




//減少硬碟欄位
const handle_Remove_Disk = (e,index) => {
  e.preventDefault()
  console.log(index)
  const deleteVal = [...counter]
  console.log(deleteVal)
  deleteVal.splice(index,1)
  setCounter(deleteVal)

};

const handle_Remove_Disk2 = (e,index) => {
  // e.preventDefault()
  // console.log(e.target)
  // e.target.parentElement.parentElement.remove();
  return null
};

const handle_Remove_Disk3 = async(e,index) => {
  e.preventDefault()
  let deleteVal2 =  [...counter2]
  deleteVal2.splice(index,1)
  setCounter2(deleteVal2)

};

//硬碟input欄位內容
const handleChange = (e,i) => {
  try{
    const {name,value} = e.target
    console.log(e.target)
    console.log(counter)
    const onChangeVal = [...counter]
    console.log(onChangeVal)
    onChangeVal[i][name] = value
  
    setCounter(onChangeVal)
  }catch(error){
    console.log(error)
  }

}

//硬碟input欄位內容
const handleChange2 = (e,i) => {
  try{
    const {name,value} = e.target
    console.log(e.target)
    console.log(value)
    console.log(counter2)
    const onChangeVa2 = [...counter2]
 
    onChangeVa2[i][name] = value
    setCounter2(onChangeVa2)
    console.log(onChangeVa2)
  }catch(error){
    console.log(error)
  }

}










 

//儲存按鈕
  const handle_Submit = (e) => {
    e.preventDefault();

    const newEC2 = {
      ID:uuidv4(),
      DEMAND:demand,
      EC2NAME:ec2Name,
      DISK:disk,
      COUNTER:counter,
      OS: os,
      RESOURCE: resource,
      SUBNET:subnet,
      IP:ip,
      APPLY_DATE: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    } 
    
    //找出額外新增的硬碟
    let array_disk_dynamic = document.getElementsByClassName('EC2_disk_dynamic')
    array_disk_dynamic = Object.values(array_disk_dynamic)

    //先將紅色告警消除
    server_name_default.current.classList.remove('alarm')
    demand_default.current.classList.remove('alarm') 
    disk_default.current.classList.remove('alarm')
    array_disk_dynamic.map((item,index) => {
      if(item.value !== ''){
        return document.getElementById(`dynamic${index}`).classList.remove('alarm')
        
      }
      return null
    })


 
   
    //額外硬碟沒有填寫的欄位，增加紅色告警
    array_disk_dynamic.map((item,index) => {
      if(item.value === ''){
        return document.getElementById(`dynamic${index}`).classList.add('alarm')
      }
      return null
    })

    console.log(array_disk_dynamic)
    
    if(server_name_default.current.value === '' && demand_default.current.value === '' && disk_default.current.value === ''){
      server_name_default.current.classList.add('alarm')
      demand_default.current.classList.add('alarm') 
      disk_default.current.classList.add('alarm') 
      return 
      
    } else if(server_name_default.current.value === '' && demand_default.current.value === ''){
      server_name_default.current.classList.add('alarm')
      demand_default.current.classList.add('alarm') 
      return 
    } else if(server_name_default.current.value === '' && disk_default.current.value === ''){
      server_name_default.current.classList.add('alarm')
      disk_default.current.classList.add('alarm') 
      return 
    }else if(demand_default.current.value === '' && disk_default.current.value === ''){
      demand_default.current.classList.add('alarm') 
      disk_default.current.classList.add('alarm') 
      return 
    }else if(server_name_default.current.value  === ''){
      server_name_default.current.classList.add('alarm') 
      return 
    } else if(demand_default.current.value  === ''){
      demand_default.current.classList.add('alarm') 
      return 
    // }else if(disk_default.current.value === ''){
    //   disk_default.current.classList.add('alarm') 
    //   return 
    } else {
      dispatch({type:"ADD_EC2",payload:newEC2})
      $('#form_modal').modal('hide')
    
    }





    //送出到前端table list後，form回復預設值
   
    server_name_default.current.value = ''
    os_default.current.value = 'ami-006e00d6ac75d2ebb'
    resource_default.current.value = 't1.micro'
    subnet_default.current.value = 'A'
    disk_default.current.value = 30

    
    setOS('ami-006e00d6ac75d2ebb')
    setResource('t1.micro')
    setSubnet('A')
    setIp(false)
    setDisk(30)
    setCounter([])

    if(query2.npage >= 1){ 
      setTriggerNext((triggerNext) => triggerNext + 1);

    }
  
  };

//修改按鈕
const editEC2 = async(ID) => {
  console.log(state)
 const edit_EC2 = await state.allEC2.find((item) => 
   item.ID === ID
 )
 console.log(edit_EC2)
 const index_of_List = state.allEC2.findIndex(item => item.ID === ID)
 setTheindex(index_of_List)
 await setEdit(true)
 //await setIp(edit_EC2.IP) 有正確改成要的IP狀態，但樓下註解還是false
 await $('#form_modal_edit').modal('show')


 demand_default.current.value = edit_EC2.DEMAND
 server_name_default.current.value = edit_EC2.EC2NAME
 os_default.current.value = edit_EC2.OS
 resource_default.current.value = edit_EC2.RESOURCE
 subnet_default.current.value = edit_EC2.SUBNET
 disk_default.current.value = edit_EC2.DISK
 edit_EC2.COUNTER.map((item,index) => {
  return dynamic_default.current[index].value = edit_EC2.COUNTER[index].EC2_disk
 })
 
 


 setTheid(ID)
 setDemand(edit_EC2.DEMAND)
 setEc2Name(edit_EC2.EC2NAME)
 setOS(edit_EC2.OS)
 setResource(edit_EC2.RESOURCE)
 setDisk(edit_EC2.DISK)
 setSubnet(edit_EC2.SUBNET)
 setIp(edit_EC2.IP) 
 if(subnet_default.current.value === 'DMZ1' || subnet_default.current.value === 'DMZ2'){
   console.log(edit_EC2.IP)

  check_default.current.checked = edit_EC2.IP//不能使用ip，還是會是false。應該是執行順序的問題

 } 

} 


//刪除按鈕
const deleteEC2 = async (ID) => {
  const newEC2s = state.allEC2.filter((item) => 
    item.ID !== ID
  )
  console.log(newEC2s)
  dispatch({type:"DELETE_EC2",payload:newEC2s})

  console.log(query2.records.length)
  if(query2.records.length <= 1){
    setTriggerPrevious((triggerPrevious) => triggerPrevious - 1);
  }

  if(state.allEC2.length <= 1){
    setDemand('')
  }

} 
    
//更新按鈕
const handle_Update = async(e) => {
  e.preventDefault()
  //檢查欄位是否填完整
  if(server_name_default.current.value === '' && demand_default.current.value === ''){
    server_name_default.current.classList.add('alarm')
    demand_default.current.classList.add('alarm') 
    return
  } else if(server_name_default.current.value === ''){
    return  server_name_default.current.classList.add('alarm')
    

  } else if(demand_default.current.value  === ''){
    return demand_default.current.classList.add('alarm') 
   
  } 


  const update = {ID:theId,DEMAND:demand,EC2NAME:ec2Name,OS:os,RESOURCE:resource,DISK:disk,COUNTER: counter2,SUBNET:subnet,IP:ip,
    APPLY_DATE: `${new Date().getFullYear()} - ${new Date().getMonth() + 1}-${new Date().getDate()}`}

  await dispatch({type:"UPDATE_EC2",payload:update})
  await $('#form_modal_edit').modal('hide')
  await setEdit(false)
  if(query3.length > 0){
    window.location.reload(true)
  }

 
    //要將state回復預設值
    setEdit(false)
    setEc2Name('')
    setOS('ami-006e00d6ac75d2ebb')
    setResource('t1.micro')
    setSubnet('A')
    setIp(false)
    setDisk(30)
    setCounter2([])


}


//取消按鈕
const cancel = (e) => {
  //檢查欄位是否填完整
  server_name_default.current.classList.remove('alarm')
  demand_default.current.classList.remove('alarm') 
  //disk_default.current.classList.remove('alarm') 
  //要將表格欄位回復預設值
  demand_default.current.value = demand
  server_name_default.current.value = ''
  os_default.current.value = 'ami-006e00d6ac75d2ebb'
  resource_default.current.value = 't1.micro'
  subnet_default.current.value = 'A'
  //disk_default.current.value = 30


  //要將state回復預設值
  setTheid('')
  setEdit(false)
  setEc2Name('')
  setOS('ami-006e00d6ac75d2ebb')
  setResource('t1.micro')
  setDisk(30)
  setCounter([])
  setSubnet('A')
  setIp(false)

}


//送出按鈕(資料庫)
const handle_Submit_DB =async(e) => {
    try{
      axios.defaults.withCredentials = true //一定要有這行，解決reload後，無法送出問題
      await setDisabled(true)
       for (const[i,value] of state.allEC2.entries()){
        let payload = state.allEC2
        console.log(payload)
        const url = 'http://localhost:5020/task'
      await axios.post(url,{
          ad_displayname:payload[i].AD_DISPLAYNAME,
          ad_samaccountname:payload[i].AD_SAMACCOUNTNAME,
          ad_depeartment:payload[i].AD_DEPARTMENT,
          demand:payload[i].DEMAND,
          server_name:payload[i].EC2NAME,
          ami:payload[i].OS,
          instance_type:payload[i].RESOURCE,
          disk1:payload[i].DISK,
          extra_disks:payload[i].COUNTER.map((item) => {
            return item
          }),
          subnet:payload[i].SUBNET,
          ip:payload[i].IP
        })

      }
    

  await new Promise((resolve, reject) => {
  
    resolve(setLoading(true));

    });


     
    
      
  await new Promise((resolve, reject) => {
        setTimeout(() => {
             resolve(dispatch({type:"DELETE_ALL_EC2"}));
             console.log('done2')
        }, 3000);
        
    });
     
  

  await new Promise((resolve, reject) => {
    resolve(setLoading(false));
    console.log('done3')
      })
    

  await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(window.alert('資料已完成上傳'));
        console.log('done4')
      },1000)
      setDemand('')
  })

  await new Promise((resolve, reject) => {
    setDisabled(false)
})

  
    
    }catch(error){
      console.log(error.name)
 
      window.alert('無法成功上傳資料，請稍後再試，或請通知系統管理課')
  }
  
  }

  

  
 
  return <>
    <EC2Context.Provider value={state} >
        
    <div className='bar_ad_settings'>
          <div className="username">{
           encryptStorage1.getItem('query5').sAMAccountName + ' ' + 
           encryptStorage1.getItem('query5').displayName
            }
            </div> 
            <Logout />
        </div> 
    
          <button type="button" className="main" data-toggle="modal" data-target=".form_modal" id="click-modal">開始建立主機</button>
          {state.allEC2.length > 0 && 
          <button type="button" onClick={handle_Submit_DB} disabled={disabled} className="main">送出</button>
          }
          
          
          {/* 要再確認EditEC2Form的props那些要留 20230423*/}
          {edit ? <EditEC2Form theId={theId} theIndex={theIndex} demand_default={demand_default} server_name_default={server_name_default} 
          os_default={os_default} disk_default={disk_default} dynamic_default={dynamic_default} resource_default={resource_default} subnet_default={subnet_default} check_default={check_default} demand_ChangeHandler={demand_ChangeHandler}
          ec2_Name_ChangeHandler={ec2_Name_ChangeHandler} os_ChangeHandler={os_ChangeHandler} disk_ChangeHandler={disk_ChangeHandler} instance_type_ChangeHandler={instance_type_ChangeHandler}  subnet_ChangeHandler={subnet_ChangeHandler}  
            ip_ChangeHandler={ip_ChangeHandler}  cancel={cancel} handle_Update={handle_Update} subnet={subnet} counter={counter} counter2={counter2} handle_Add_Disk={handle_Add_Disk} handle_Add_Disk2={handle_Add_Disk2} handle_Remove_Disk={handle_Remove_Disk} handleChange={handleChange} 
            handle_Remove_Disk2={handle_Remove_Disk2} handle_Remove_Disk3={handle_Remove_Disk3} handleChange2={handleChange2}/> 
            
            : <EC2Form demand={demand} demand_default={demand_default} server_name_default={server_name_default} os_default={os_default} disk_default={disk_default}
            resource_default={resource_default} subnet_default={subnet_default} check_default={check_default}
            demand_ChangeHandler={demand_ChangeHandler} ec2_Name_ChangeHandler={ec2_Name_ChangeHandler} os_ChangeHandler={os_ChangeHandler} disk_ChangeHandler={disk_ChangeHandler} instance_type_ChangeHandler={instance_type_ChangeHandler}  
            subnet_ChangeHandler={subnet_ChangeHandler} ip_ChangeHandler={ip_ChangeHandler} 
            cancel={cancel} handle_Submit={handle_Submit} subnet={subnet} counter={counter} handle_Add_Disk={handle_Add_Disk} handle_Remove_Disk={handle_Remove_Disk} handleChange={handleChange}/>}
            
            <Search deleteEC2={deleteEC2} editEC2={editEC2} setQuery3={setQuery3} triggerNext={triggerNext} triggerPrevious={triggerPrevious} search_default={search_default}/>

            {query3.length > 0 ? <SearchEC2TableList query3={query3} deleteEC2={deleteEC2} editEC2={editEC2}/> : 
            
            
            state.allEC2.length > 0 ? 
              <EC2TableList deleteEC2={deleteEC2} editEC2={editEC2} setQuery2={setQuery2} triggerNext={triggerNext} triggerPrevious={triggerPrevious} counter={counter}/>
              :
              <EmptyTableList />}
           {loading && <div className="clip_loader"  ref={spinner_default}><ClipLoader id="ClipLoader" color="#36d7b7" size="100px"/></div>}
     
     
      </EC2Context.Provider>
  
    </>
}

export default CreateEC2