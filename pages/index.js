import Head from 'next/head'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { useAuth } from "react-use-auth";



const Guestbook = props => {
    const {isAuthenticated, isAuthenticating, login, logout, user} = useAuth();

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <link
                    rel="shortcut icon"
                    type="image/x-icon"
                    href="/static/favicon.png"
                />
            </Head>
            <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
            <div>
                <Hero user={isAuthenticated() ? user : null} />
                <Footer/>
            </div>
            <style jsx>{`
        div {
          display: flex;
          margin-left: auto;
          margin-right: auto;
          font-family: sans-serif, sans;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
        </>
    )
}

export default Guestbook