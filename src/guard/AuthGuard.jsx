import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
    const authState = useSelector((state) => state.auth);

    if (!authState.isLogin) {
        return <Navigate to={'/auth/login'} />
    }
    return (
        children
    )
}
export default AuthGuard;