import '../styles/App.css';

export default function Glass({ children, className="" }) {
    return (
        <div className={`glass_container ${className}`}>
            {children}
        </div>
    )
}