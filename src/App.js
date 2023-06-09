import React,{useState,useEffect} from 'react'
import Login from './components/Login'
import NavbarHead from './components/NavbarHead';
import Footer from './components/Footer'
import CreateEC2 from './components/CreateEC2'
import ApplyEC2 from './components/ApplyEC2'
import EditEC2 from './components/EditEC2'
import BackendEC2 from './components/BackendEC2'
import ProtectedRoutes from './components/ProtectedRoutes';
import { Routes, Route,Outlet } from 'react-router-dom'
import { useNavigate,useLocation } from 'react-router-dom';
import { EncryptStorage } from 'encrypt-storage';




export const encryptStorage1 = new EncryptStorage('carasfdvafsbADB', {
  storageType: 'sessionStorage',
});



const App = () => {
  const [query,setQuery] = useState('')
  const [query4,setQuery4] = useState('') //登入AD後，顯示username在/create_ec2
  const [query5,setQuery5] = useState('') //使用AD資訊，可給form使用
  const [log_in,setLog_in] = useState(false)
  let navigate = useNavigate()
  let location = useLocation()


  

  useEffect(() => {
    async function keepIt(){
     
      let log_in_result = await JSON.parse(sessionStorage.getItem('log_In'))
      
      await setLog_in(log_in_result)
      if(location.pathname === '/create_ec2'){
        return  navigate('/create_ec2')
      }

      if(location.pathname === '/show_ec2'){
        return  navigate('/show_ec2')
      }

      if(location.pathname === '/edit_ec2'){
        return  navigate('/edit_ec2')
      }

      if(location.pathname === '/backend'){
        return  navigate('/backend')
      }

     
    }
    keepIt()
    

   
  },[])

  
  useEffect(() => {
   

    sessionStorage.setItem('log_In', JSON.stringify(log_in));

  },[log_in])



  useEffect(() => {
    if(query5 !== ''){
      //不需要使用JSON.stringify
      encryptStorage1.setItem('query5', query5);
     //sessionStorage.setItem('query5',JSON.stringify(query5))

  
    }
    
  },[query5])

  return <>
    
              <Routes>

                  <Route path="/login" element={ <Login setLog_in={setLog_in} setQuery4={setQuery4} setQuery5={setQuery5}/>}></Route> 
                  <Route element={<ProtectedRoutes log_in={log_in}/>}>
                  
              
                   <Route element={<>
                        <NavbarHead /> 
                        <div className="container">
                        <Outlet />
                        <Footer />
                        </div>
                        </>}>  
                      <Route path="/create_ec2" element={ <CreateEC2 setQuery={setQuery} query4={query4} query5={query5}/>}></Route>
                      <Route path="/show_ec2" element={ <ApplyEC2 query={query} />}></Route>
                      <Route path="/edit_ec2" element={ <EditEC2/>}></Route>            
                      <Route path="/backend" element={ <BackendEC2/>}></Route>           
                    </Route>  
                   </Route>     
              </Routes>
    </>
}

export default App