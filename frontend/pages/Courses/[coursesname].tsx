import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import Image from "next/image";
import useMediaQuery from "../../common/hook/mediaHook";
import Link from "next/link";
useRouter;
const CoursesName = () => {
    const router = useRouter();
    const isBigger = useMediaQuery("md");
    console.log(router.query.coursesname);
    return (
        <div>
            <NavBar />
            <div className="w-[100vw] h-[100vh] bg-white">
                <div
                    className="bg-f654 w-[100vw] h-auto max-h-[337px] flex  flex-col md:flex-row justify-around gap-3 items-center
                text-center md:text-start p-4 md:p-0"
                >
                    <div className="p-3 w-auto">
                        <div className="font-bold text-[max(23px,2.5vw)] font-['Montserrat'] ">
                            Blockchain Applications
                        </div>
                        <div className=" text-[max(8px,1vw)] font-['Montserrat']">
                            Apply blockchain technology to real-world business
                            challenges as you learn from a top-10 ranked
                            university in the United States. Earn a powerful
                            university-issued career credential in as little as
                            three months. ...
                        </div>
                    </div>
                    <div className="w-fit h-fit">
                        {isBigger ? (
                            <Image
                                src="/landingImage/blockchain.png"
                                alt="blockchain"
                                width={700}
                                height={500}
                            />
                        ) : (
                            <Image
                                src="/landingImage/blockchain.png"
                                alt="blockchain"
                                width={250}
                                height={150}
                            />
                        )}
                    </div>
                </div>
                <div
                    className={`bg-white w-[100vw] h-[150px] flex  items-center ${
                        isBigger ? "" : "justify-center"
                    }`}
                >
                    <div className="flex flex-row gap-2 md:pl-10">
                        <div className="flex flex-row items-center justify-center">
                            <Link
                                className="bg-38 w-auto gap-2 h-auto rounded-[10px] text-white font-semibold font-['Montserrat'] flex flex-row p-2"
                                href={"/"}
                            >
                                <Image
                                    src="/landingImage/youtubeicon2.png"
                                    alt="youtube"
                                    width={32}
                                    height={32}
                                />{" "}
                                Course Video
                            </Link>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <Link
                                className="bg-38 w-auto gap-2 h-auto rounded-[10px] text-white font-semibold font-['Montserrat'] flex flex-row p-2"
                                href={"/"}
                            >
                                <Image
                                    src="/landingImage/Assignment.png"
                                    alt="youtube"
                                    width={32}
                                    height={32}
                                />{" "}
                                Course Video
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-[100vw] h-[80px] bg-cyandark flex items-center">
                    <div
                        className=" text-white font-semibold font-['Montserrat'] md:text-[2.3vw] text-[15px]
                    p-4"
                    >
                        Course Materials
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CoursesName;
