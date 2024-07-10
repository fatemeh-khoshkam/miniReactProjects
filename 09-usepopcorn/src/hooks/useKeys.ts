import {useEffect} from "react";

export function useKeys (key:string , action: () => void){
    useEffect(() => {
        function close(e: KeyboardEvent){
            if(e.code.toLowerCase() === key.toLowerCase()){
                action();
            }
        }
        document.addEventListener("keydown", close);

        return function (){
            document.removeEventListener("keydown", close);
        }
    }, [action , key]);
}