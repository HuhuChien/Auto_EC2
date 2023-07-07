
import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {FaAws} from "react-icons/fa";
import axios from 'axios';




const Login = ({setLog_in,setQuery4,setQuery5}) => {
    //var CryptoJS = require("crypto-js");
    const [username_ad,setUsername_ad] = useState('')
    const [password_ad,setPassword_ad] = useState('')
    const [show_username,set_Show_username] = useState('')
    const [ad_info,set_Ad_info] = useState('')//給<App.js />使用，可傳給children component
    let navigate = useNavigate()
    //const [cookies, setCookie, removeCookie] = useCookies(['token']);

    useEffect(() => {
        setQuery4(show_username)
    },[show_username,setQuery4]) //要再確認是否要放setQuery4

    useEffect(() => {
        //let bytes = AES.decrypt(ad_info,'abbbabadbadbbda')
        //setQuery5(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
        setQuery5(ad_info)
    },[ad_info,setQuery4,setQuery5]) //要再確認是否要放setQuery4、setQuery5


  

    //沒效果，要在處理

/*
    useEffect(() => {
        async function test(){
            const url = `http://localhost:5020/logout`
            await axios.get(url)
        }
        test()
        //Cookies.remove('token')
    },[])
*/

const username_ChangeHandler = (e) => {
        setUsername_ad(e.target.value)
    
    }

const password_ChangeHandler = (e) => {
    setPassword_ad(e.target.value)
}


const handle_login = (async(e) => {
    e.preventDefault()
    const url = 'http://localhost:5020/auth/login'
   

    
    try{
        axios.defaults.withCredentials = true;//一定要設定，因為client browser要接收cookie
        const result = await axios.post(url,{
            username:username_ad + '@evertrust.com.tw',
            password:password_ad
        })
        let sAMAccountName = result.data.user.username.split('@')[0]  
        const url2 = `http://localhost:5020/auth/AD/${sAMAccountName}` 
       
        const result2 = await axios.get(url2)
        if(result.status === 200){
            try{
                setLog_in(true)
                set_Ad_info(result2.data)
                set_Show_username(result.data.user.username.split('@')[0].toUpperCase() + result2.data.displayName)
                navigate('/create_ec2')
            }catch(error){
                console.log(error)
            }
          
      
        } else {
            navigate('/login')
         
        }

    }catch(error){
        console.log(error)
        window.alert('帳號或密碼錯誤')

    }
    
})

  return <>
     
     <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form" method="POST" onSubmit={handle_login}>
					<span className="login100-form-title p-b-26">
						<div>AWS雲端主機</div>
						<div>建立系統</div>		
					</span>

					<div className="wrap-input100">
                        <input onChange={username_ChangeHandler} className="input100" type="text" name="ad_username" placeholder='AD帳號 例如:A0001'/>   
					</div>

					<div className="wrap-input100">
	                    <input onChange={password_ChangeHandler} className="input100" type="password" name="ad_password" placeholder='AD密碼'/>
					</div>

					<div className="container-login100-form-btn">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button className="login100-form-btn">登入</button>
						</div>
					</div>
                    {/* <div className="text-center p-t-115"> */}
					<div className="text-center p-t-22">
                             <FaAws className="aws_logo"/> 
					</div>
                   
				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>
        
    
	


    
  </>
}

export default Login