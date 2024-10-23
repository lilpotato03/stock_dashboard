import { useEffect, useState } from "react"
import Candle from "./Candle"
interface GraphProps{
    data:Record<string,any>[]
}
function Graph(props:GraphProps) {

    function updateBounds(low:number,high:number){
        if(high>max){
            setMax(high)
        }
        if(low<min){
            setMin(low)
        }
    }
    useEffect(()=>{
        if(props.data && props.data[1]){props.data[1].forEach((item:Record<string,string>)=>{
            updateBounds(parseFloat(item['low']),parseFloat(item['high']))
        })}
        else{
            console.log('Graph props not populated yet')
        }
    },[props.data])
    const [min,setMin]=useState<number>(99999999999999)
    const [max,setMax]=useState<number>(0)
    return (
    <div className="w-full max-w-[60rem] h-full max-h-[30rem] bg-neutral-700 rounded-md p-2 flex flex-col items-center gap-y-2">
        <div className="meta h-full max-h-[3rem] w-full   rounded-md"></div>
        <div className="graph grid h-full w-full bg-neutral-800 rounded-md grid-cols-12 grid-rows-8 p-2 gap-2">
            <div className="candlearea h-full w-full bg-neutral-900 row-start-1 row-span-7 col-start-1 col-span-11 flex  items-end justify-evenly rounded-md border-2 border-neutral-700 py-4">
                {
                    props.data[1]?props.data[1].map((info:Record<string,string>,id:number)=>(
                    <Candle key={id} meta={props.data[0]} val={info} scale={340/(max-min)} bmargin={parseFloat(info['low'])-min} />
                      )
                    ):<></>
                }
            </div>
            <div className="timeseries h-full w-full row-start-8 row-end-9 col-span-11 text-white  rounded-md">

            </div>
            <div className="pricerange h-full w-full col-start-12 col-end-13 row-span-7  text-white flex flex-col justify-between items-center rounded-md">
                <p>{max.toFixed(2)}</p>
                <p>{min.toFixed(2)}</p>
            </div>
        </div>
    </div>
  )
}

export default Graph