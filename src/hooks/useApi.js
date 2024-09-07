import axios from "axios";
import { useEffect, useState } from "react"

const useApi = (url)=>{
   const [loading, setLoading] =  useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState(null)

   const fetchApi= async()=>{
    try{
    setLoading(true)
    const response = await axios.get(url)
    setData(response.data)
    }catch(err){
    setError(err.message);
    }finally{
    setLoading(false)
    }
   }
   useEffect(()=>{
    fetchApi()
    },[url])
    return {loading, data, error}
}


export default useApi;