import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Head";
import { createEmotionCache, MantineProvider } from "@mantine/core";

const myCache = createEmotionCache({
    key: "mantine",
    prepend: false,
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div>
            <MantineProvider emotionCache={myCache}>
                <Header />
                <Component {...pageProps} />

            </MantineProvider>
            <Header />
        </div>
    );
}
