import React from 'react'
import App from "next/app";
import { AuthProvider } from "react-use-auth";
import { useRouter } from "next/router";

function MyApp({Component, pageProps}) {
    const router = useRouter()
    return (<AuthProvider
        auth0_domain={process.env.AUTH0_DOMAIN}
        auth0_client_id={process.env.AUTH0_CLIENT_ID}
        navigate={router.push}
    >
        <Component {...pageProps} />
    </AuthProvider>)
}

export default class _App extends App {
    render() {
        return <MyApp {...this.props} />;
    }
}