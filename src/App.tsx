import { useEffect, useState } from 'react';
import Candle from './components/Candle';
import axios from "axios"
import Graph from './components/Graph';

function App() {

  const getData=async(duration:string,symbol:string|string[],length:number)=>{
    try{
    const uri:string=`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${duration}&outputsize=${length}&apikey=${import.meta.env.VITE_API_KEY}`
    const res:Record<any,any>=await axios.get(uri)
    const keys=Object.keys(res.data)
    const bdata:Record<any,any>[]=keys.map((key)=>res.data[key])
    console.log(data)
    setData(bdata)
    }
    catch(e:any){
      console.log(e.message)
    }
  }
  const [data,setData]=useState<Record<string, any>[]>([])

  useEffect(()=>{
    getData('1month','AAPL',30)
  },[])
  return (
    <div className='w-[100vw] h-[100vh] gap-x-2 bg-black flex justify-center items-center p-5'>
      <Graph data={data}/>
    </div>
  )
}

export default App
