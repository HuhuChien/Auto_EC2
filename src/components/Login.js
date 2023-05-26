
import React,{ useState, useEffect,useRef,useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
//import  { AES, enc } from "crypto-js";



const Login = ({setLog_in,setQuery4,setQuery5}) => {
    //var CryptoJS = require("crypto-js");
    const [username_ad,setUsername_ad] = useState('')
    const [password_ad,setPassword_ad] = useState('')
    const [show_username,set_Show_username] = useState('')
    const [ad_info,set_Ad_info] = useState('')//給<App.js />使用，可傳給children component
    let navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

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
            username:username_ad,
            password:password_ad
        })
        let sAMAccountName = result.data.user.username.split('@')[0]  
        const url2 = `http://localhost:5020/auth/AD/${sAMAccountName}` 
       
        const result2 = await axios.get(url2)
        console.log(result)
        console.log(result2.data)
        if(result.status === 200){
            try{
                setLog_in(true)
                //console.log(result2.data)
                //set_Ad_info(AES.encrypt(JSON.stringify(result2.data),'abbbabadbadbbda').toString())
                set_Ad_info(result2.data)
                set_Show_username(result.data.user.username.split('@')[0].toUpperCase() + result2.data.displayName)
                navigate('/create_ec2')
            }catch(error){
                console.log(error)
            }
          
      
        } else {
            navigate('/login')
            console.log('weird')
        }

    }catch(error){
        console.log(error)
    }
    

  
})





  return <>
        <form method="POST" onSubmit={handle_login}>
                <div className="container">
                    <label htmlFor="">Username</label>
                    <input onChange={username_ChangeHandler} type="text" name="ad_username"/>

                    <label htmlFor="">Password</label>
                    <input onChange={password_ChangeHandler} type="text" name="ad_password"/>
                    <button type="submit">登入</button>
                </div>
        </form>
    
  </>
}

export default Login