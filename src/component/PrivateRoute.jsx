import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from './State';

 function PrivateRoute({ component }) {

    const login = useRecoilValue(loginState);

        return (
        login === true ? component : <Navigate to="/login" /> 
   
        )}

 export default PrivateRoute;