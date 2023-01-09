import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Header />
            <Component {...pageProps} />
        </div>
    );
}
