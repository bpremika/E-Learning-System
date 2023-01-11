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
            <MantineProvider
                emotionCache={myCache}
                theme={{
                    colors: {
                        "GlobalTalk-Cyan-Dark": [
                            "#ecf6f9",
                            "#c5e5ed",
                            "#9ed4e1",
                            "#77c2d5",
                            "#50b1c9",
                            "#3697af",
                            "#2a7688",
                            "#1e5461",
                            "#12323a",
                            "#061113",
                        ],
                    },
                    primaryShade: 7,
                }}
            >
                <UserContextProvider>
                    <Header />
                    <NavBar />
                    <Component {...pageProps} />
                </UserContextProvider>
            </MantineProvider>
        </div>
    );
}
