import React from 'react'
import {AiTwotoneSetting} from "react-icons/ai";
import axios from 'axios';

const logout = async () => {

    const url = `http://localhost:5020/logout`

    await axios.get(url)
    sessionStorage.clear()
    

}

const Logout = () => {
  return <>

          <div className="nav-item dropdown setting">
                    <a className="" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <AiTwotoneSetting size={23} color='#B22222' />
                    </a>
                
                    <div className="dropdown-menu dropdown-menu-left" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item dropdown-item-logout" href="/login" onClick={() => logout()}>登出</a> 
                    </div>
         </div>
    </>
}

export default Logout