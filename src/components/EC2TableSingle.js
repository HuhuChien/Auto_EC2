import React from 'react'
import { OverlayTrigger,Popover } from 'react-bootstrap';

import data from './adjust_format.json'
import { AiFillCheckSquare  } from "react-icons/ai";
import {MdOutlineDangerous} from "react-icons/md";
import {FiMoreVertical} from "react-icons/fi";
import {GrStorage} from "react-icons/gr";
import {encryptStorage1} from '../App'
//import $ from 'jquery'; 
const EC2TableSingle = ({ID,DEMAND,EC2NAME,OS,RESOURCE,DISK,COUNTER,APPLY_DATE,SUBNET,IP,deleteEC2,editEC2}) => {
  
  
  let new_OS = data[0][OS]
  let new_RESOURCE= data[1][RESOURCE]

  let the_counter = COUNTER.map((item,index) => {
    return <div key={index}>硬碟{index+2}:{item.EC2_disk}GB</div>
  })

  let popover = (
    <Popover>
      <Popover.Body>
      <div>硬碟1:{DISK}GB</div>
      <div className='the_newline'>{the_counter}</div>
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
              <td>{SUBNET}</td>
              {IP === true ? 
              <td><AiFillCheckSquare className='ip_svg'/></td>
              :<td><MdOutlineDangerous className='ip_svg'/></td>
            }
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