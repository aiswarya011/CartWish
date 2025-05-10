import { useNavigate } from 'react-router-dom';

const ProtectedRouting = ({isAuthenticated, htmlElement }) => {
    const nav = useNavigate();
    return (
        isAuthenticated ? htmlElement : 
        nav('/login')
    )
}

export default ProtectedRouting
