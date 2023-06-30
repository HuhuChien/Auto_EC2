import React from 'react'

const EmptyTableList = () => {
  return <>
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
    
              <th scope="col">進階</th>
            </tr>
          </thead>
          <tbody className=''>
            <tr>
                <td className='no-data'>無資料</td>
            </tr>
               
    
          </tbody>
        </table>
  
  </>

}

export default EmptyTableList