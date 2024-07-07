import {useState} from "react";

export default function Box({children}: {children: React.ReactNode}) {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <div className="box">
            <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
                {isOpen ? "–" : "+"}
            </button>

            {isOpen && children}
        </div>
    )
}