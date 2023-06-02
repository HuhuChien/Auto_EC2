
import React,{ useEffect,useContext,useState } from 'react'
import EC2TableSingle from './EC2TableSingle'
import { EC2Context } from './CreateEC2'
import {VscChevronLeft,VscChevronRight} from "react-icons/vsc";



const EC2TableList = ({deleteEC2,editEC2,setQuery2,triggerNext,triggerPrevious,counter}) => {


  const receiveData = useContext(EC2Context)
  
  const [currentPage,setCurrentPage] = useState(1)
  const recordsPerPage = 5
  
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage //例如:10-5=5。第2頁的第1個
  const records = receiveData.allEC2.slice(firstIndex,lastIndex)
  const npage = Math.ceil(receiveData.allEC2.length / recordsPerPage)
  //const numbers = [...Array(npage + 1).keys()].slice(1) //最後是array，如果npage=5，結果是[1,2,3,4,5]
  
  let data = {
    currentPage:currentPage,
    recordsPerPage:recordsPerPage,
    lastIndex:lastIndex,
    firstIndex:firstIndex,
    records:records,
    npage:npage,
  
  }
  
  
  
  const nextPage = () => {
    if(currentPage !== npage){
      setCurrentPage(currentPage + 1)
    }


  }


    const prePage = () => {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }


  useEffect(() => {

    setQuery2(data)
  // eslint-disable-next-line
  },[data.records.length,npage,currentPage,lastIndex,firstIndex,setQuery2])

  useEffect(() => {
    
 
    if(triggerNext){
      nextPage()

    }
      // eslint-disable-next-line
  },[triggerNext])


  useEffect(() => {
    if(triggerPrevious){
      prePage()
     
    }
     // eslint-disable-next-line
  },[triggerPrevious])



  
  return <>
  {receiveData.allEC2.length > 0 &&
  
  <nav className="page">
  <ul className='pagination'>
  
      <li className='page-item'>
          <a href="#/" className='' onClick={prePage}><VscChevronLeft /></a>
      </li>
      <li className='page-item'>
            <div>
              <span>第{currentPage}頁</span>
              <span>/共{npage}頁</span>
              <span>(共{receiveData.allEC2.length}筆)</span>
              
            </div>
      </li>
      <li className='page-item'>
        <a href="#/" className='' onClick={nextPage}><VscChevronRight /></a>
      </li>
  

  </ul>
</nav>
  
  
  
  }
  


    {receiveData.allEC2.length > 0 &&
        <table className="table create">
          <thead className="">
            <tr>
              <th scope="col">需求單單號</th>
              <th scope="col">申請人</th>
              <th scope="col">申請人部門</th>
              <th scope="col">主機名稱</th>
              <th scope="col">主機作業系統</th>
              <th scope="col">主機規格</th>
              <th scope="col">主機硬碟</th>
              <th scope="col">網段</th>
              <th scope="col">對外IP</th>
              <th scope="col">進階</th>
            </tr>
          </thead>
          <tbody>

                {records.map((ec2,index) => {
                      //console.log(ec2)
                      return <EC2TableSingle key={ec2.ID} {...ec2} number={index} deleteEC2={deleteEC2} editEC2={editEC2} />
                    
                    
                })


                }


          </tbody>
        </table>
   
    }

  
  
  </>
    
  
}

export default EC2TableList