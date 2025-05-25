import { forwardRef } from 'react';
import '../styles/App.css';

// export default function Glass({ children, className="" }) {
//     return (
//         <div className={`glass_container ${className}`}>
//             {children}
//         </div>
//     )
// }

const Glass = forwardRef(function Glass(props, ref) {
    return (
        <div ref={ref} className={`glass_container ${props.className || ''}`}>
            {props.children}
        </div>
    )
})

export default Glass;