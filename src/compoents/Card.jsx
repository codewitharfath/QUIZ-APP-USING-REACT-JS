import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import questionData from "../sample.json"

const Card = () => {
    const [current,setcurrent] = useState(0)
    const [score,setscore] = useState(0)
    const [showscore,setshowscore] = useState(false)
    const [timer,settimer] = useState(10)


    useEffect(()=>{
        let interval;
        if(timer > 0 && !showscore){
            interval = setInterval(()=>{
                settimer((prev) => prev -  1)
            },1000)
        }else{
            clearInterval(interval)
            setshowscore(true)
        }
        return ()=> clearInterval(interval)
    },[timer,showscore])
    const handle = (selectoption)=>{
        if(selectoption === questionData[current].currentOption){
            setscore((pre)=> pre + 1)

        }
        if(current<questionData.length-1){
            setcurrent((pre)=> pre +1)
            settimer(10)
        }else{
            setshowscore(true)
        }

    }
    const handlechange = ()=>{
        setcurrent(0)
        setscore(0)
        setshowscore(false)
        settimer(10)
    }
  return (

    <>
    <div className="quiz-app">
     {showscore ? ( <div className="score-section" >
            <p>your score {score}/{questionData.length}</p>
            <button onClick={handlechange}>reset</button>
        </div>
     ):(
        <div className="quiz-section">
            <h1>Question {current+1}</h1>
            <h2>{questionData[current].question}</h2>
            <div className="options">
               {questionData[current].option.map((item,index)=>{
                return <button onClick={()=> handle(item)} key={index}>{item}</button>
               })}
            </div>
            <div className="time">Time Left: <span>{timer}s</span> </div>
        </div>
     )}
    </div>
    
    </>
  )
}

export default Card