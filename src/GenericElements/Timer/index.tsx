import * as React from "react";
import {ITimerProps} from "@followBack/GenericElements/Timer/types";
import {useEffect} from "react";
import Typography from "@followBack/GenericElements/Typography";

const Timer: React.FC<ITimerProps> = ({duration, onFinish = ()=>{}}) => {
    const [timer, setTimer] = React.useState(duration);
    let timerId: NodeJS.Timeout;
    const clear=()=>{
        clearInterval(timerId)
    };

    React.useEffect(()=>{
        timerId = setInterval(()=>{
            setTimer((time)=>time-1)
        },1000);
        return ()=>clear();
    },[]);

    React.useEffect(()=>{
        if(timer===0){
            onFinish();
            clear()
        }

    },[timer]);

    return <Typography type="smallRegularBody" color="secondary">{timer}</Typography>
};

export default React.memo(Timer);
