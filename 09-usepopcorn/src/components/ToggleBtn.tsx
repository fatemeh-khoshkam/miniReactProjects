
type toggleBtnProps = {
    isOpen?: boolean;
    onClick?: () => void;
}

export default function ToggleBtn({ isOpen , onClick } : toggleBtnProps) {
    return <button className="btn-toggle">{isOpen ? "-" : "+"}</button>;
}
