import React, { useEffect } from "react";
import { useAuth } from "react-use-auth";

const AuthCallback = () => {
    const { handleAuthentication } = useAuth();
    useEffect(() => {
        handleAuthentication();
    }, []);

    return (
        <div>
            Processing...
        </div>
    );
};

export default AuthCallback;