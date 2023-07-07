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
  const [os,setOS] = useState('ami-0e515107fd2bcc7fe')
  const [disk,setDisk] = useState(30)
  const [resource,setResource] = useState('t3.nano')
  const [subnet,setSubnet] = useState('subnet-f20f8085')
  const [ip,setIp] = useState(false)
  const [edit,setEdit] = useState(false)
  const [loading,setLoading] = useState(false)
  const [ghost,setGhost] = useState(false)
  const [cancelstorage,setCancelStorage] = useState(false)
  const [counter, setCounter] = useState([])
  const [counter2, setCounter2] = useState([])
  const [query2,setQuery2] = useState('')
  const [query3,setQuery3] = useState([])
  const [theIndex,setTheindex] = useState('')
  const [triggerNext, setTriggerNext] = useState(0);
  const [triggerPrevious, setTriggerPrevious] = useState(0);
  const [loggin_user,set_Loggin_user] = useState('')
  const [disabled,setDisabled] = useState(false) 
  const [uploading,setUploading] = useState(true)



  const demand_default = useRef(null)
  const server_name_default = useRef(null)
  const os_default = useRef(null)
  const disk_default = useRef(null)
  const dynamic_default = useRef([])
  const dynamic_disks_default = useRef(null)
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
      console.log(e.target.value)
      if(e.target.value.startsWith('0')){
        setDisk(e.target.value.replace(/^0*/,""))
 
      } else {
        setDisk(e.target.value)
      }
    
}
  
  const instance_type_ChangeHandler = (e) => {
      setResource(e.target.value)
      
  }

  const subnet_ChangeHandler = (e) => {
    setSubnet(e.target.value)

}

  const ip_ChangeHandler = (e) => {
  setIp(!ip)
}


//硬碟input欄位內容
//EC2Form.js、EditEC2Form.js
const handleChange = async(e,i) => {
  try{
    let elements = document.querySelectorAll('.the_form-row:not(.ghost)')
    let new_elements = Object.values(elements)
    let important_index = new_elements.findIndex(function(item,index){
      return item.childNodes[0].childNodes[2].childNodes[0].value === e.target.value
    })
  
    const {name,value} = e.target
    const onChangeVal = [...counter]
    

    if(ghost){
      onChangeVal[important_index][name]= value
    }else {
      onChangeVal[i][name]= value
    }
    
 
    
    console.log(onChangeVal)

    // 沒有效果(待處理20230703)
    
    onChangeVal.forEach((item,index) => {
      console.log(item.EC2_disk)
      if(item.EC2_disk.startsWith('0')){
         item.EC2_disk.replace(/^0*/,"")
      }
    })
    

    console.log(onChangeVal)
    setCounter(onChangeVal)
  
  } catch(error){
    console.log(error)
  }



}

//硬碟input欄位內容
//EditEC2Form.js
const handleChange2 = (e,i) => {
  try{
    const {name,value} = e.target
    const onChangeVa2 = [...counter2]
    onChangeVa2[i][name] = value
    setCounter2(onChangeVa2)

  }catch(error){
    console.log(error)
  }

}



//增加硬碟欄位
//EC2Form.js
const handle_Add_Disk = (e) => {

  e.preventDefault()
  console.log('add_disk')
  setCounter([...counter,{}]);
  console.log(counter)
};

//EditEC2Form.js
const handle_Add_Disk2 = (e) => {
  e.preventDefault()
  
  console.log('add_disk2')
  setCounter2([...counter2,{}]);
  console.log(counter2)

};




//減少硬碟欄位，沒有用到
const handle_Remove_Disk = (e,index) => {
  e.preventDefault()
  console.log(index)
  const deleteVal = [...counter]
  console.log(deleteVal)
  deleteVal.splice(index,1)
  setCounter(deleteVal)
  console.log('handle_Remove_Disk')

};



//EditEC2Form.js
const handle_Remove_Disk2 = async(e,index) => {

   
      e.preventDefault()
      setGhost(true)
      let elements = document.querySelectorAll('.the_form-row:not(.ghost)')
      console.log(elements)
      let new_elements = Object.values(elements)
      let important_index = new_elements.findIndex(function(item,index){
        console.log(item)
        console.log(e.target.id)
        return item.id === e.target.id
      })
      console.log(important_index)
      const deleteVal = [...counter]
      deleteVal.splice(important_index,1)
      setCounter(deleteVal)
      e.target.parentElement.parentElement.classList.add('ghost')
      //e.target.parentElement.childNodes[2].childNodes[0].id = 'none'
      //console.log(e.target.parentElement.childNodes[2].childNodes[0].id)
};


//EditEC2Form.js
const handle_Remove_Disk3 = async(e,index) => {
  e.preventDefault()
  let deleteVal2 =  [...counter2]
  deleteVal2.splice(index,1)
  setCounter2(deleteVal2)


};





//儲存按鈕
  const handle_Submit = (e) => {
    
    try{
      e.preventDefault();

      const newEC2 = {
        ID:uuidv4(),
        AD_DISPLAYNAME:encryptStorage1.getItem('query5').displayName,
        AD_SAMACCOUNTNAME:encryptStorage1.getItem('query5').sAMAccountName,
        AD_DEPARTMENT:encryptStorage1.getItem('query5').dn.split(',')[1].split('=')[1],
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
      console.log(array_disk_dynamic)
      array_disk_dynamic = Object.values(array_disk_dynamic)
      console.log(array_disk_dynamic)
      //先將紅色告警消除
      demand_default.current.classList.remove('alarm')
      server_name_default.current.classList.remove('alarm')
      disk_default.current.classList.remove('alarm')
     
     
      
      //檢查各欄位是否空白(主要有4個欄位可能會被User留空白)
      if(demand.trim().length === 0 && ec2Name.trim().length === 0 && disk.length === 0 && array_disk_dynamic.length > 0){
        demand_default.current.classList.add('alarm') 
        server_name_default.current.classList.add('alarm')  
        disk_default.current.classList.add('alarm') 
        
        array_disk_dynamic.map((item,index) => {
          if(item.value !== ''){
            return document.getElementById(`dynamic${index}`).classList.remove('alarm')
          } else if(item.value === '') {
            return document.getElementById(`dynamic${index}`).classList.add('alarm')
          } 
          return null
        })
        return 


        } else if(demand.trim().length === 0 && ec2Name.trim().length === 0 && array_disk_dynamic.length > 0){
          demand_default.current.classList.add('alarm') 
          server_name_default.current.classList.add('alarm')  

          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return
        } else if(demand.trim().length === 0 && disk.length === 0 && array_disk_dynamic.length > 0){
          demand_default.current.classList.add('alarm') 
          disk_default.current.classList.add('alarm')
      
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return 
        } else if(ec2Name.trim().length === 0 && disk.length === 0 && array_disk_dynamic.length > 0){
          server_name_default.current.classList.add('alarm')   
          disk_default.current.classList.add('alarm')
      
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return 
        } else if(ec2Name.trim().length === 0  && array_disk_dynamic.length > 0){
          server_name_default.current.classList.add('alarm')   
  
      
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return 
        } else if(demand.trim().length === 0 && array_disk_dynamic.length > 0){
          demand_default.current.classList.add('alarm') 
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return 
        } else if(disk.length === 0 && array_disk_dynamic.length > 0){
          disk_default.current.classList.add('alarm')
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return 
        } else if(demand.trim().length === 0 && ec2Name.trim().length === 0 && disk.length === 0){
          demand_default.current.classList.add('alarm') 
          server_name_default.current.classList.add('alarm')  
          disk_default.current.classList.add('alarm') 
          return 
        } else if(demand.trim().length === 0 && ec2Name.trim().length === 0){
            demand_default.current.classList.add('alarm') 
            server_name_default.current.classList.add('alarm')  
            return 
        } else if(demand.trim().length === 0 && disk.length === 0){
          demand_default.current.classList.add('alarm') 
          disk_default.current.classList.add('alarm') 
          return 
        } else if(ec2Name.trim().length === 0 && disk.length === 0){
          server_name_default.current.classList.add('alarm')  
          disk_default.current.classList.add('alarm') 
          return 
        } else if(demand.trim().length === 0){
          demand_default.current.classList.add('alarm') 
          return 
        } else if(ec2Name.trim().length === 0){
          server_name_default.current.classList.add('alarm')  
          return
        } else if(disk.length === 0){
          disk_default.current.classList.add('alarm') 
          return 
        } else if(array_disk_dynamic.length > 0 && array_disk_dynamic.find(item => item.value === '')){
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return 
        } else {
            dispatch({type:"ADD_EC2",payload:newEC2})
            $('#form_modal').modal('hide')
          }
   
   
      
  
  
  
  
  
  
      //送出到前端table list後，form回復預設值
     
      server_name_default.current.value = ''
      os_default.current.value = 'ami-0e515107fd2bcc7fe'
      resource_default.current.value = 't3.nano'
      subnet_default.current.value = 'subnet-f20f8085'
      disk_default.current.value = 30
  
     
      setOS('ami-0e515107fd2bcc7fe')
      setResource('t3.nano')
      setSubnet('subnet-f20f8085')
      setIp(false)
      setDisk(30)
      setCounter([])

      if(query2.npage >= 1){ 
        setTriggerNext((triggerNext) => triggerNext + 1);
  
      }
    }catch(error){
      console.log(error)
    }
    
    
   
  
  };

//修改按鈕
const editEC2 = async(ID) => {

 const edit_EC2 = await state.allEC2.find((item) => 
   item.ID === ID
 )
 console.log(edit_EC2)
 const index_of_List =  await state.allEC2.findIndex(item => item.ID === ID)

 await setTheindex(index_of_List)
 
 await setCounter(state.allEC2[index_of_List].COUNTER)
 
 await setEdit(true)


 
 //await setIp(edit_EC2.IP) 有正確改成要的IP狀態，但樓下註解還是false
 await $('#form_modal_edit').modal('show')
 

 demand_default.current.value = edit_EC2.DEMAND
 server_name_default.current.value = edit_EC2.EC2NAME
 os_default.current.value = edit_EC2.OS
 resource_default.current.value = edit_EC2.RESOURCE
 subnet_default.current.value = edit_EC2.SUBNET
 disk_default.current.value = edit_EC2.DISK



 //UI Input欄位代入原本數值
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

  try{
      e.preventDefault()
      //檢查欄位是否填完整
      
      //找出額外新增的硬碟
      let array_disk_dynamic = document.getElementsByClassName('EC2_disk_dynamic')
      array_disk_dynamic = Object.values(array_disk_dynamic)

  
      //先將紅色告警消除
      demand_default.current.classList.remove('alarm')
      server_name_default.current.classList.remove('alarm')
      disk_default.current.classList.remove('alarm')
     
     
      
      //檢查各欄位是否空白(主要有4個欄位可能會被User留空白)
      
      
      if(demand.trim().length === 0 && ec2Name.trim().length === 0 && disk.length === 0 && array_disk_dynamic.length > 0){
        demand_default.current.classList.add('alarm') 
        server_name_default.current.classList.add('alarm')  
        disk_default.current.classList.add('alarm') 
        
        array_disk_dynamic.map((item,index) => {
          if(item.value !== ''){
            return document.getElementById(`dynamic${index}`).classList.remove('alarm')
          } else if(item.value === '') {
            return document.getElementById(`dynamic${index}`).classList.add('alarm')
          } 
          return null
        })
        return 


        } else if(demand.trim().length === 0 && ec2Name.trim().length === 0 && array_disk_dynamic.length > 0){
          demand_default.current.classList.add('alarm') 
          server_name_default.current.classList.add('alarm')  

          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return
        } else if(demand.trim().length === 0 && disk.length === 0 && array_disk_dynamic.length > 0){
          demand_default.current.classList.add('alarm') 
          disk_default.current.classList.add('alarm')
      
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return 
        } else if(ec2Name.trim().length === 0 && disk.length === 0 && array_disk_dynamic.length > 0){
          server_name_default.current.classList.add('alarm')   
          disk_default.current.classList.add('alarm')
      
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return 
        } else if(ec2Name.trim().length === 0  && array_disk_dynamic.length > 0){
          server_name_default.current.classList.add('alarm')   
  
      
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return 
        } else if(demand.trim().length === 0 && array_disk_dynamic.length > 0){
          demand_default.current.classList.add('alarm') 
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return 
        } else if(disk.length === 0 && array_disk_dynamic.length > 0){
          disk_default.current.classList.add('alarm')
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return 
        } else if(demand.trim().length === 0 && ec2Name.trim().length === 0 && disk.length === 0){
          demand_default.current.classList.add('alarm') 
          server_name_default.current.classList.add('alarm')  
          disk_default.current.classList.add('alarm') 
          return 
        } else if(demand.trim().length === 0 && ec2Name.trim().length === 0){
            demand_default.current.classList.add('alarm') 
            server_name_default.current.classList.add('alarm')  
            return 
        } else if(demand.trim().length === 0 && disk.length === 0){
          demand_default.current.classList.add('alarm') 
          disk_default.current.classList.add('alarm') 
          return 
        } else if(ec2Name.trim().length === 0 && disk.length === 0){
          server_name_default.current.classList.add('alarm')  
          disk_default.current.classList.add('alarm') 
          return 
        } else if(demand.trim().length === 0){
          demand_default.current.classList.add('alarm') 
          return 
        } else if(ec2Name.trim().length === 0){
          server_name_default.current.classList.add('alarm')  
          return
        } else if(disk.length === 0){
          disk_default.current.classList.add('alarm') 
          return 
        } else if(array_disk_dynamic.length > 0 && array_disk_dynamic.find(item => item.value === '')){
          array_disk_dynamic.map((item,index) => {
            if(item.value !== ''){
              return document.getElementById(`dynamic${index}`).classList.remove('alarm')
            } else if(item.value === '') {
              return document.getElementById(`dynamic${index}`).classList.add('alarm')
            } 
            return null
          })
          return   
        } else {
          const update = { 
          AD_DISPLAYNAME:encryptStorage1.getItem('query5').displayName,
          AD_SAMACCOUNTNAME:encryptStorage1.getItem('query5').sAMAccountName,
          AD_DEPARTMENT:encryptStorage1.getItem('query5').dn.split(',')[1].split('=')[1],
          ID:theId,
          DEMAND:demand,
          EC2NAME:ec2Name,
          OS:os,
          RESOURCE:resource,
          DISK:disk, 
          COUNTER:[...counter,...counter2],
          SUBNET:subnet
          }
        
          await dispatch({type:"UPDATE_EC2",payload:update})
          await $('#form_modal_edit').modal('hide')
          await setEdit(false)
        }
     

  
    if(query3.length > 0){
      window.location.reload(true)
    }
  
      
      //要將state回復預設值
      setEdit(false)
      setEc2Name('')
      setOS('ami-0e515107fd2bcc7fe')
      setResource('t3.nano')
      setSubnet('subnet-f20f8085')
      setIp(false)
      setDisk(30)
      setCounter([])
      setCounter2([])
      setGhost(false)
      setCancelStorage(false)
  }catch(error){
    console.log(error)
  }

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
  os_default.current.value = 'ami-0e515107fd2bcc7fe'
  resource_default.current.value = 't3.nano'
  subnet_default.current.value = 'subnet-f20f8085'
  //disk_default.current.value = 30


  //要將state回復預設值
  setTheid('')
  setEdit(false)
  setEc2Name('')
  setOS('ami-0e515107fd2bcc7fe')
  setResource('t3.nano')
  setDisk(30)
  setCounter([])
  setCounter2([])
  setSubnet('subnet-f20f8085')
  setIp(false)
  setGhost(false)
  setCancelStorage(true)
  window.location.reload(false);

}





//送出按鈕(資料庫)
const handle_Submit_DB =async(e) => {
    

          axios.defaults.withCredentials = true //一定要有這行，解決reload後，無法送出問題
          await setDisabled(true)
     
          //檢查主機名稱是否有重覆
          state.allEC2.forEach(async(item,index) => {
              let payload = state.allEC2
              const url = 'http://localhost:5020/check_name'
              axios.post(url,{
                server_name:payload[index].EC2NAME
              })
              .then((response) => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
                setUploading(false)
                window.alert(error.response.data.error)
     
              }) 
          })
             
         
          if(uploading){
              //上傳資料到資料庫
              for (const[i,value] of state.allEC2.entries()){
                let payload = state.allEC2
                //console.log(payload)
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
                      elastic_ip:payload[i].IP
                  })
              }

              await new Promise((resolve, reject) => {
                
                resolve(setLoading(true));

                });  
                  
              await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(dispatch({type:"DELETE_ALL_EC2"}));       
                    }, 3000);           
                });
                

              await new Promise((resolve, reject) => {
                resolve(setLoading(false));

              })
                

              await new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve(window.alert('資料已完成上傳'));
                  
                  },1000)
                  setDemand('')
              })

              await new Promise((resolve, reject) => {
                setDisabled(false)
              })

              await new Promise((resolve, reject) => {
                setUploading(true)
              })

          
          

              
    }
    

 

      
  }


  return <>
    <EC2Context.Provider value={state}>
        
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
          ec2_Name_ChangeHandler={ec2_Name_ChangeHandler} os_ChangeHandler={os_ChangeHandler} disk_ChangeHandler={disk_ChangeHandler} instance_type_ChangeHandler={instance_type_ChangeHandler}  
          subnet_ChangeHandler={subnet_ChangeHandler} ip_ChangeHandler={ip_ChangeHandler}  cancel={cancel} handle_Update={handle_Update} subnet={subnet} counter={counter} counter2={counter2} handle_Add_Disk={handle_Add_Disk} handle_Add_Disk2={handle_Add_Disk2} handle_Remove_Disk={handle_Remove_Disk} handleChange={handleChange} 
            handle_Remove_Disk2={handle_Remove_Disk2} handle_Remove_Disk3={handle_Remove_Disk3} handleChange2={handleChange2} ghost={ghost}/> 
            
            : <EC2Form demand={demand} demand_default={demand_default} server_name_default={server_name_default} os_default={os_default} disk_default={disk_default}
            dynamic_disks_default={dynamic_disks_default} resource_default={resource_default} subnet_default={subnet_default} check_default={check_default}
            demand_ChangeHandler={demand_ChangeHandler} ec2_Name_ChangeHandler={ec2_Name_ChangeHandler} os_ChangeHandler={os_ChangeHandler} disk_ChangeHandler={disk_ChangeHandler} instance_type_ChangeHandler={instance_type_ChangeHandler}  
            subnet_ChangeHandler={subnet_ChangeHandler} ip_ChangeHandler={ip_ChangeHandler} 
            cancel={cancel} handle_Submit={handle_Submit} subnet={subnet} counter={counter} handle_Add_Disk={handle_Add_Disk} handle_Remove_Disk={handle_Remove_Disk} handleChange={handleChange}/>}
            
            <Search deleteEC2={deleteEC2} editEC2={editEC2} setQuery3={setQuery3} triggerNext={triggerNext} triggerPrevious={triggerPrevious} search_default={search_default}/>

            {query3.length > 0 ? <SearchEC2TableList query3={query3} deleteEC2={deleteEC2} editEC2={editEC2}/> : 
            
            
            state.allEC2.length > 0 ? 
              <EC2TableList deleteEC2={deleteEC2} editEC2={editEC2} setQuery2={setQuery2} triggerNext={triggerNext} triggerPrevious={triggerPrevious} counter={counter} cancelstorage={cancelstorage} theIndex={theIndex}/>
              :
              <EmptyTableList />}
              {loading && <div className="clip_loader"  ref={spinner_default}><ClipLoader id="ClipLoader" color="#36d7b7" size="100px"/></div>}
     
     
      </EC2Context.Provider>
  
    </>
}

export default CreateEC2