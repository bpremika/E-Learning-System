import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Image from "next/image";
import useMediaQuery from "../common/hook/mediaHook";
import Link from "next/link";
import FileName from "./common/FileName";
import { client } from "../common/axios/axios";
import { useEffect, useState } from "react";

const CoursesName = () => {
    const router = useRouter();
    const isBigger = useMediaQuery("md");
    const [data, setData] = useState({
        course_desc: "Does not exist",
        course_detail: "",
        email: "xxx@mail.com",
        first_name: "premika",
        id: 1,
        image_url: "",
        last_name: "yu",
        name: "Algorithm Design",
    });
    const { id } = router?.query;
    async function getProps() {
        const res = await client.get(`/course/studentInfo/${id}`);
        console.log(res.data);
        setData(res.data);
    }
    useEffect(() => {
        if (!router.isReady) return;
        getProps();
    }, [router.isReady]);

    return (
        <div>
            <div className="w-[100vw] h-[100vh] bg-white">
                <div
                    className="bg-f654 w-[100vw] h-auto max-h-[337px] flex  flex-col md:flex-row justify-around gap-3 items-center
                text-center md:text-start p-4 md:p-0"
                >
                    <div className="p-3 w-auto">
                        <div className="font-bold text-[max(23px,2.5vw)] font-['Montserrat'] ">
                            {data.name}
                        </div>
                        <div className=" text-[max(8px,1vw)] font-['Montserrat']">
                            {data.course_desc}
                        </div>
                    </div>
                    <div className="w-fit h-fit">
                        {isBigger ? (
                            <Image
                                src="/landingImage/blockchain.png"
                                alt="blockchain"
                                width={500}
                                height={300}
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
                    <div className="flex flex-col md:flex-row gap-2 md:pl-10">
                        <div className="flex flex-row items-center justify-center">
                            <Link
                                className="bg-38 w-auto gap-2 h-auto rounded-[10px] text-white font-semibold font-['Montserrat'] flex flex-row p-2"
                                href={"/videopage/1"}
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
                                Assignments
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
                <div className="flex flex-col p-4 gap-3 w-[100vw] h-[217px]">
                    <FileName name={"Week_1.pdf"} url={"/"} />
                    <FileName name={"Week_2.pdf"} url={"/"} />
                </div>

                <div className="flex flex-row h-[calc(700px-2vw)]">
                    <div className={` flex w-[60vw] box-border flex-col `}>
                        <div
                            className="
                      min-h-[80px]  h-[80px] bg-cyandark flex items-center w-[100%]"
                        >
                            <div
                                className=" text-white font-semibold  font-['Montserrat'] md:text-[2.3vw] text-[15px]
                    p-4"
                            >
                                Description
                            </div>
                        </div>
                        <div className="p-6  w-[50vw] overflow-scroll">
                            <p className="font-['Montserrat'] text-[15px] ">
                                {data.course_detail}
                            </p>
                        </div>
                    </div>

                    <div className="flex w-[40vw] box-border flex-col">
                        <div className="h-[80px] bg-cyandark flex items-center w-[100%] ">
                            <div
                                className=" text-white font-semibold  font-['Montserrat'] md:text-[2.3vw] text-[15px]
                    p-4"
                            >
                                Instructor
                            </div>
                        </div>
                        <div className="m-5 flex flex-col md:flex-row items-center gap-4">
                            <div>
                                <Image
                                    src="/landingImage/nattee.png"
                                    alt=""
                                    width={102}
                                    height={102}
                                    className="rounded-full"
                                ></Image>
                            </div>
                            <div>
                                <div>
                                    <h3 className="text-center font-bold tracking-[1px]  text-[14px] md:text-[20px] font-['Montserrat']">
                                        {data.first_name} {data.last_name}
                                    </h3>
                                </div>
                                <div>
                                    <h4 className="text-center font-semibold text-[10px] md:text-[15px] font-['Montserrat']">
                                        {data.email}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CoursesName;
