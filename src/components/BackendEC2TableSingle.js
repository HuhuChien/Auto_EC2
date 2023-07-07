import React from 'react'
import { OverlayTrigger,Popover } from 'react-bootstrap';

import data from './adjust_format.json'
import { AiFillCheckSquare  } from "react-icons/ai";
import {MdOutlineDangerous} from "react-icons/md";
import {GrStorage} from "react-icons/gr";
import {FiMoreVertical} from "react-icons/fi";
import {encryptStorage1} from '../App'
const BackendEC2TableSingle = ({_id,demand,server_name,ami,disk1,extra_disks
  ,instance_type,subnet,elastic_ip,deleteEC2,editEC2}) => {
   
    console.log(elastic_ip)
    
    let new_OS = data[0][ami]
    let new_RESOURCE= data[1][instance_type]
    let new_SUBNET= data[2][subnet]
    let the_counter = extra_disks.map((item,index) => {
      return <div>硬碟{index+2}:{item.EC2_disk}GB</div>
    })


    let popover = (
      <Popover>
        <Popover.Body>
         <div>硬碟1:{disk1}GB</div> 
          <div className='the_newline'>{the_counter}</div>
        </Popover.Body>
      </Popover>
    );



    return <>
          <tr>

             <td>
                  {demand}
             </td>
             <td>{encryptStorage1.getItem('query5').cn}</td>
             <td>{encryptStorage1.getItem('query5').dn.split(",")[1].split('_')[1]}</td>
              <td>{server_name}</td>
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
             {elastic_ip === true ? 
              <td><AiFillCheckSquare /></td>
              :<td><MdOutlineDangerous /></td>
              }
              <td className="nav-item dropdown">
                    <a className="" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <FiMoreVertical />
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="#/" onClick={() => editEC2(_id)}>修改</a> 
                      <a className="dropdown-item" href="#/" onClick={() => deleteEC2(_id)}>刪除</a>
                    </div>
              </td>
  
              
        </tr>



         



  </>
}

export default BackendEC2TableSingle