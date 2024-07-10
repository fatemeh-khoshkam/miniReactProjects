import {useEffect, useRef} from "react";


export default function Search({query , onSetQuery}: {query: string , onSetQuery: (query: string) => void }) {
    const inputEl = useRef<HTMLInputElement | null>(null);

    useEffect(function() {
        function callback(e: KeyboardEvent) {

            if (document.activeElement === inputEl.current) return;

           if(e.code === 'Enter'){
             if (inputEl.current) inputEl.current.focus();
             onSetQuery('')
           }
        }

        document.addEventListener('keydown' , callback);
        return function (){
            document.removeEventListener("keydown", callback);
        }
    }, [onSetQuery])

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