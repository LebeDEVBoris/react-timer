import React, {useState, useEffect} from 'react'
import './Timer.sass'

export const Timer = () => {

    // State
    const [time, setTime] = useState(1500)
    const [mins, setMins] = useState(null)
    const [secs, setSecs] = useState(null)

    const [stop, setStop] = useState(true)
    const [start, setStart] = useState(false)

    // Handlers
    const startHandler = () => {
        setStop((value) => !value)
        setStart((value) => !value)
    }

    const resetHandler = () => {
        setTime(1500)
    }

    // Life Cycle Methods
    useEffect(() => {
        const hours = Math.floor( time / 3600 )
        const minutes = Math.floor( (time - (hours * 3600)) / 60)
        let seconds = time - (hours * 3600) - (minutes * 60)
        seconds = Math.round(seconds * 100) / 100

        setMins(minutes)
        setSecs(seconds)

        if ((time % 60) < 10) {
            console.log('here')
            setSecs('0' + (time % 60))
        }

        let intervalId
        if (start) {
            intervalId = setInterval(() => {
                setTime((time) => time - 1)
            }, 1000)
        }

        return () => clearInterval(intervalId)
    })

    const startBtn = (start === false) ? 'Start' : 'Stop'
    let title = (start === false) ? 'Let the countdown begin!' : 'Never quit, keep going!'
    if (stop && time !== 1500) {
        title = 'Keep it up!'
    }

    return (
        <div className="timer">
            <div className="timer__title">
                {title}
            </div>
            <div className="timer__content">
                <div className="timer__countdown">
                    {mins} : {secs}
                </div>
                <div className="timer__buttons">
                    <button onClick={startHandler}>{startBtn}</button>
                    <button onClick={resetHandler}>Reset</button>
                </div>
            </div>
        </div>
    )
}