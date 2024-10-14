interface CandleProps{
  meta:Record<string,string>
  val:Record<string,string>
}

function Candle(props:CandleProps) {
  let {meta,val}=props
  const keys=Object.keys(val)
  const values:any[]=keys.map((key,id)=>id!=0?parseFloat(val[key]):val[key])
  const height=values[2]-values[3]
  const bm=Math.min(values[1],values[4])-values[3]
  const bh=Math.abs(values[1]-values[4])
  const clr=bh==0?'none':values[1]-values[4]>0?'red':'green'
  return (
    <div style={{height:`${height*4}px`
    }} className={`w-[8px] relative flex justify-center items-center`}>
      <div style={{backgroundColor:clr}}className='stick absolute w-[1px] h-full '></div>
      <div style={{height:`${bh*4}px`,
                   bottom:`${bm*4}px`,
                   backgroundColor:clr
      }} className="box w-full absolute "></div>
    </div>
  )
}

export default Candle