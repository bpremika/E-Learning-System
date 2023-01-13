import Image from "next/image";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });
import useMediaQuery from "../common/hook/mediaHook";
import Link from "next/link";

export default function LandingPageCom() {
    const isBiggerThanMd = useMediaQuery("md");
    let flexDirection = isBiggerThanMd ? "flex-row" : "flex-col";
    let justifyItem = isBiggerThanMd ? "" : "items-center";
    let textalingn = isBiggerThanMd ? "" : "text-center";

    return (
        <>
            <div
                className={`md:h-[740px] w-[100vw] flex bg-offwhite ${flexDirection} justify-center  items-center pt-[20px] gap-5`}
            >
                <div
                    className={`md:w-[500px] w-[335px] h-fit flex flex-col gap-7 ${justifyItem}`}
                >
                    <div>
                        <p className="font-['Montserrat'] font-bold text-cyandark tracking-wide">
                            E-COURSE PLATFORM
                        </p>
                    </div>
                    <div>
                        <p
                            className={`font-['Dela_Gothic_One'] text-[30px] md:text-[min(54px,5vw)]  tracking-[-2px] ${textalingn} `}
                        >
                            Learning and teaching online, made easy.
                        </p>
                    </div>
                    <div>
                        <p
                            className={`font-['Montserrat'] font-semibold text-smoothgrey w-[380px] ${textalingn} `}
                        >
                            Practice your English and learn new things with the
                            platform.
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/Courses"
                            className="font-['Montserrat'] font-bold text-cyandark bg-cyanlight rounded-[100px] w-fit pt-[10px] pb-[10px] pr-[15px] pl-[15px]"
                        >
                            Explore our courses
                        </Link>
                    </div>
                    <div>
                        <div className="flex flex-row">
                            <div className="flex flex-row ">
                                <div className="self-center mr-4 items-center">
                                    <Image
                                        src="/landingImage/thunder.svg"
                                        alt="gameboy"
                                        width={26}
                                        height={30}
                                    ></Image>
                                </div>
                                <div className="flex flex-col w-[163px] border-r-2 border-greyry">
                                    <span className="text-[40px] font-['Dela_Gothic_One'] ">
                                        600
                                        <span className="text-cyandark">+</span>
                                    </span>
                                    <span className="font-semibold text-[16px] text-smoothgrey">
                                        Popular words
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row ml-8">
                                <div className="self-center">
                                    <Image
                                        src="/landingImage/vector.png"
                                        alt="gameboy"
                                        width={24}
                                        height={30}
                                    ></Image>
                                </div>
                                <div className="flex flex-col md:w-[163px] ml-4">
                                    <span className="text-[40px] font-['Dela_Gothic_One'] ">
                                        2
                                        <span className="text-cyandark">+</span>
                                    </span>
                                    <span className="font-semibold text-[16px] text-smoothgrey">
                                        Mini-games
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-fit h-fit">
                    {isBiggerThanMd ? (
                        <Image
                            src="/landingImage/casualBoy.png"
                            width={722}
                            height={601}
                            alt="casualBoy"
                        />
                    ) : (
                        <Image
                            src="/landingImage/casualBoy.png"
                            width={300}
                            height={601}
                            alt="casualBoy"
                        />
                    )}
                </div>
            </div>
            <div
                className={`md:h-[600px]   w-[100vw] flex bg-white ${flexDirection} justify-center  items-center pt-[20px]`}
            >
                <div>
                    {isBiggerThanMd ? (
                        <Image
                            alt="sitgirl"
                            src="./landingImage/sitgirl.svg"
                            width={580}
                            height={445}
                        ></Image>
                    ) : (
                        <Image
                            alt="sitgirl"
                            src="./landingImage/sitgirl.svg"
                            width={270}
                            height={445}
                        ></Image>
                    )}
                </div>
                <div
                    className={`md:w-[500px] w-[335px] h-fit flex flex-col gap-5 ${justifyItem} p-[20px]`}
                >
                    <div>
                        <p
                            className={`font-['Dela_Gothic_One'] text-[30px] md:text-[min(54px,5vw)]  tracking-[-2px] ${textalingn} `}
                        >
                            Learn a language in a playful way
                        </p>
                    </div>
                    <div>
                        <p
                            className={`font-['Montserrat'] font-semibold text-smoothgrey w-[380px] ${textalingn} `}
                        >
                            Make learning words more fun with mini-games
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={`md:h-[540px]   w-[100vw] flex bg-offwhite ${flexDirection} justify-center  items-center pt-[20px]`}
            >
                <div
                    className={`md:w-[500px] w-[335px] h-fit flex flex-col gap-5 ${justifyItem}`}
                >
                    <div>
                        <p
                            className={`font-['Dela_Gothic_One'] text-[30px] md:text-[min(54px,5vw)]  tracking-[-2px] ${textalingn} `}
                        >
                            Increase your vocabulary
                        </p>
                    </div>
                    <div>
                        <p
                            className={`font-['Montserrat'] font-semibold text-smoothgrey w-[380px] ${textalingn} `}
                        >
                            Traditional and new effective approaches to word
                            study
                        </p>
                    </div>
                </div>
                <div>
                    {isBiggerThanMd ? (
                        <Image
                            alt="sitgirl"
                            src="./landingImage/holdbookgirl.svg"
                            width={580}
                            height={473}
                        ></Image>
                    ) : (
                        <Image
                            alt="sitgirl"
                            src="./landingImage/holdbookgirl.svg"
                            width={290}
                            height={473}
                        ></Image>
                    )}
                </div>
            </div>
            <div
                className={`md:h-[600px]   w-[100vw] flex bg-white ${flexDirection} justify-center  items-center pt-[20px]`}
            >
                <div>
                    {isBiggerThanMd ? (
                        <Image
                            alt="sitgirl"
                            src="./landingImage/girlnboy.svg"
                            width={680}
                            height={479}
                        ></Image>
                    ) : (
                        <Image
                            alt="sitgirl"
                            src="./landingImage/girlnboy.svg"
                            width={340}
                            height={479}
                        ></Image>
                    )}
                </div>
                <div
                    className={`md:w-[500px] w-[335px] h-fit flex flex-col gap-5 ${justifyItem} p-[20px]`}
                >
                    <div>
                        <p
                            className={`font-['Dela_Gothic_One'] text-[30px] md:text-[min(54px,5vw)]  tracking-[-2px] ${textalingn} `}
                        >
                            Watch your progress every day
                        </p>
                    </div>
                    <div>
                        <p
                            className={`font-['Montserrat'] font-semibold text-smoothgrey w-[380px] ${textalingn} `}
                        >
                            Save statistics on your achievements, words learned,
                            and mistakes
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
