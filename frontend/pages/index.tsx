import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import AdviceCard from "../components/AdviceCard";
const inter = Inter({ subsets: ["latin"] });
import NavBar from "../components/NavBar";
export default function Home() {
    return (
        <>
            <NavBar />
            {/* {Array.from({ length: 10 }, () => 0).map((_, i) => {
                return <AdviceCard number={i} />;
            })} */}
        </>
    );
}
