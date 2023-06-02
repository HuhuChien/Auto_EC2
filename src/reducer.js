const reducer = (state,action) => {
    if(action.type === 'ADD_EC2'){
    
        const newEC2_list = [...state.allEC2, action.payload ]//有[]，代表複製...state，再加上新的object
        return {...state,allEC2:newEC2_list} //先抓出全部的state內容後，再去更新allEC2

    } 

    if(action.type === 'DELETE_EC2'){
      
        return {...state,allEC2:action.payload} //先抓出全部的state內容後，再去更新allEC2，action.payload == newEC2s


    } 


    if(action.type === 'UPDATE_EC2'){
        const {ID} = action.payload
        console.log(ID)
        const index = state.allEC2.findIndex((item) => {
            return item.ID === ID
        })
        console.log(index)
        console.log(action.payload)
        state.allEC2.splice(index,1,action.payload)

        return {...state} 


     } 

    if(action.type === 'DELETE_ALL_EC2'){
      
        return {...state,allEC2:[]} //先抓出全部的state內容後，再去更新allEC2


    } 

 
        
}

export default reducer;