import React,{useEffect,useState} from 'react'
import { OverlayTrigger,Popover } from 'react-bootstrap';

import data from './adjust_format.json'
import {FiMoreVertical} from "react-icons/fi";
import {GrStorage} from "react-icons/gr";
import {encryptStorage1} from '../App'




const EC2TableSingle = ({ID,number,DEMAND,EC2NAME,OS,RESOURCE,DISK,COUNTER,APPLY_DATE,SUBNET,IP,deleteEC2,editEC2,counter,cancelstorage,theIndex}) => {
  const [old_the_counter,setOldTheCounter] = useState('')
  
  let new_OS = data[0][OS]
  let new_RESOURCE= data[1][RESOURCE]
  let new_SUBNET= data[2][SUBNET]
  let the_counter = COUNTER.map((item,index) => {
    return <div key={index}>硬碟{index+2}:{item.EC2_disk}GB</div>
  })

  
    useEffect(() => {
      try{
        let tem = JSON.parse(sessionStorage.getItem('all')).allEC2[theIndex].COUNTER.map((item,index) => {
          return <div key={index}>硬碟{index+2}:{item.EC2_disk}GB</div>
        })
        console.log(tem)
        setOldTheCounter(tem)
       
      }catch(error){
        console.log(error)
      }
     
    },[theIndex])
 
  
  let popover = (
        <Popover>
          <Popover.Body>
          <div>硬碟1:{DISK}GB</div>
          {
            cancelstorage ?
           <div className='the_newline'>{old_the_counter}</div> :
           <div className='the_newline'>{the_counter}</div> 
          } 
          </Popover.Body>
        </Popover>
   
  );



    return <>
          <tr>
              <td>{DEMAND}</td>
              <td>{encryptStorage1.getItem('query5').cn}</td>
              <td>{encryptStorage1.getItem('query5').dn.split(",")[1].split('_')[1]}</td>
              <td>{EC2NAME}</td>
              <td>{new_OS}</td>
              <td>{new_RESOURCE}</td>
              <td>
            
                  
                  <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
                    <button className="storage">
                    {<GrStorage />}   
                    </button>
                  </OverlayTrigger>
                
          
              </td>
              <td>{new_SUBNET}</td>
         
             <td className="nav-item dropdown">
                    <a className="" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <FiMoreVertical />
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="#/" onClick={() => editEC2(ID)}>修改</a> 
                      <a className="dropdown-item" href="#/" onClick={() => deleteEC2(ID)}>刪除</a>
                    </div>
              </td> 
        </tr>



         



  </>
}

export default EC2TableSingle