
import React,{ useEffect,useContext,useState } from 'react'
import EC2TableSingle from './EC2TableSingle'
import { ApplyEC2Context } from './ApplyEC2'
import {VscChevronLeft,VscChevronRight} from "react-icons/vsc";
import {AiOutlineFileSearch} from 'react-icons/ai'
import ApplyEC2TableSingle from './ApplyEC2TableSingle';

const ApplyEC2TableList = ({tem_demand}) => {


  const receiveData = useContext(ApplyEC2Context)
  let demand_obj
  console.log(receiveData)


  
  try{
  demand_obj = JSON.parse(tem_demand);

  }catch(error){
    console.log(error)
  }
  


  return <>

  
            {receiveData.length > 0 &&
                <table className="table create">
                  <thead>
                    <tr>
                      <th scope="col">需求單單號</th>
                      <th scope="col">申請人</th>
                      <th scope="col">申請人部門</th>
                      <th scope="col">主機名稱</th>
                      <th scope="col">主機作業系統</th>
                      <th scope="col">主機規格</th>
                      <th scope="col">主機硬碟</th>
                      <th scope="col">網段</th>
                    </tr>
                  </thead>
                  <tbody>

                        {receiveData.map((ec2,index) => {
                              // console.log(ec2)
                              return <ApplyEC2TableSingle key={ec2._id} {...ec2}/>
                        
                              
                        })
                        }

                  </tbody>
                </table>
            }

  
  
  </>
    
  
}

export default ApplyEC2TableList