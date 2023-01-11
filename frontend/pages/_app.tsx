import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Head";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import NavBar from "../components/NavBar";
import { createContext, useState, useEffect } from "react";
import { UserContextProvider } from "../common/contexts/UserContext";
const myCache = createEmotionCache({
    key: "mantine",
    prepend: false,
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div>
            <MantineProvider emotionCache={myCache}>
                <UserContextProvider>
                    <Header />
                    <NavBar />
                    <Component {...pageProps} />
                </UserContextProvider>
            </MantineProvider>
        </div>
    );
}
