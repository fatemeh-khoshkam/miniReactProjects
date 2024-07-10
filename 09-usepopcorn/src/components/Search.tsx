import {useRef} from "react";
import {useKeys} from "../hooks/useKeys";


export default function Search({query , onSetQuery}: {query: string , onSetQuery: (query: string) => void }) {
    const inputEl = useRef<HTMLInputElement | null>(null);

    useKeys('Enter' , function (){
        if (document.activeElement === inputEl.current) return;
        if (inputEl.current) inputEl.current.focus();
        onSetQuery('')
    })

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies ..."
            value={query}
            onChange={(e) => onSetQuery(e.target.value)}
            ref={inputEl}
        />
    )
}