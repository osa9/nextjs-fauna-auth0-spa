import { useAuth } from "react-use-auth";
import {loginUserDetail, loginUserDetailAvatar, loginUserDetailAvatarImg, loginUserDetailItem} from "../styles/login";

const Login = () => {
    const {isAuthenticated, login, logout, user} = useAuth();

    if (isAuthenticated()) {
        return (
            <div className={loginUserDetail.className}>
                <div className={loginUserDetailAvatar.className}>
                    <img
                        className={loginUserDetailAvatarImg.className}
                        src={user.picture}
                    />
                </div>
                <div className={loginUserDetailItem.className}>{user.email} </div>
                <div className={loginUserDetailItem.className}>
                    <button onClick={logout} style={{backgroundColor: "#067df7"}}>
                        Logout
                    </button>
                </div>

                {loginUserDetail.styles}
                {loginUserDetailAvatar.styles}
                {loginUserDetailAvatarImg.styles}
                {loginUserDetailItem.styles}
            </div>
        );
    } else {
        return (
            <div className={loginUserDetail.className}>
                <button onClick={login} style={{backgroundColor: "#067df7"}}>
                    Login
                </button>
                {loginUserDetail.styles}
                {loginUserDetailAvatar.styles}
                {loginUserDetailAvatarImg.styles}
            </div>
        );
    }
};

export default Login;