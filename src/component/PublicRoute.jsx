import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from './State';

 function PublicRoute({ component }) {

    const login = useRecoilValue(loginState);

    return login ? <Navigate to="/" /> : component;
    
    }
 export default PublicRoute;