import Link from "next/link";
import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import useMediaQuery from "../common/hook/mediaHook";
import { useContext, useState } from "react";
import { Burger, NavLink, Drawer } from "@mantine/core";
import { useUser } from "../common/contexts/UserContext";
import Image from "next/image";

const Footer = () => {
    const isBiggerThanMd = useMediaQuery("md");
    const { isAuth } = useUser();
    return (
        <>
            <div className="bg-f654 h-[350px] md:h-auto flex flex-row  items-center justify-center w-[100%]">
                <div className="w-[70%] h-[100%] pt-[5px] pb-[5px] bg-f654 flex flex-col justify-center gap-3 ">
                    <div className="bg-f654 h-[144px] md:h-[30px] flex justify-around mt-[0px] md:mt-[10px] ">
                        <div className="flex md:flex-row flex-col md:gap-6 gap-3">
                            <Link href="/">
                                <div className=" text-smoothgrey font-['Montserrat'] font-semibold text-[12px] md:text-[14px] ">
                                    Home
                                </div>
                            </Link>
                            <Link href={`/${isAuth ? "Mycourses" : "Courses"}`}>
                                <div className=" text-smoothgrey font-['Montserrat'] font-semibold text-[12px] md:text-[14px] ">
                                    {isAuth ? "My Courses" : "Courses"}
                                </div>
                            </Link>
                        </div>
                        <div className="flex md:flex-row flex-col md:gap-6 gap-3">
                            <p className=" text-smoothgrey font-['Montserrat'] font-semibold text-[12px] md:text-[14px]">
                                Bruce:Fe
                            </p>
                            <p className=" text-smoothgrey font-['Montserrat'] font-semibold text-[12px] md:text-[14px]">
                                Pun:Fe
                            </p>
                            <p className=" text-smoothgrey font-['Montserrat'] font-semibold text-[12px] md:text-[14px]">
                                Pun:Be
                            </p>
                            <p className=" text-smoothgrey font-['Montserrat'] font-semibold text-[12px] md:text-[14px]">
                                Bow:Be
                            </p>
                        </div>
                    </div>
                    <hr className="bg-greyry h-[1px]"></hr>
                    <div className="bg-f654 h-[74px] md:h-[46px] flex  flex-wrap mb-[5px] justify-around flex-col md:flex-row items-center ">
                        <div className="flex flex-row gap-5 w-fit">
                            <Image
                                alt="Git"
                                src="/landingImage/Cleverse.png"
                                width={40}
                                height={24}
                            ></Image>
                            <Image
                                alt="GT"
                                src="/landingImage/Thinc.png"
                                width={45}
                                height={24}
                            ></Image>
                        </div>
                        <div className="flex items-center w-fit">
                            <p className=" text-smoothgrey font-['Montserrat'] font-semibold text-[10px] md:text-[12px]">
                                ©2021 GlobalTalk. Project for GlobalTalk.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
