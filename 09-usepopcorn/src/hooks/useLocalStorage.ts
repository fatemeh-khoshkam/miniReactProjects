import {useEffect, useState} from "react";
import {tempWatchedDataType} from "../types";

export function useLocalStorage(initialValue:tempWatchedDataType[] , key:string): [tempWatchedDataType[], React.Dispatch<React.SetStateAction<tempWatchedDataType[]>>] {
    const [value, setValue] = useState<tempWatchedDataType[]>(function(){
        const savedValues: string | null = localStorage.getItem(key);
        return savedValues ? JSON.parse(savedValues) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value , key]);

    return [value , setValue];
}