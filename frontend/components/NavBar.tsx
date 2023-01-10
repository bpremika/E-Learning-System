import Link from "next/link";
import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import useMediaQuery from "../common/hook/mediaHook";
import { useState } from "react";
import { Burger, NavLink, Drawer } from "@mantine/core";
interface props {
    isLogin: boolean;
    name: String;
}
const NavBar = ({ isLogin, name }: props) => {
    let fLetter: String = "";
    if (isLogin) {
        fLetter = name.length !== 0 ? name.charAt(0) : "";
    }

    const isBiggerThanMd = useMediaQuery("md");
    const splitt: string[] = name.split(" ", 2);
    const [opened, setOpened] = useState(false);
    const title = opened ? "Close navigation" : "Open navigation";
    return isBiggerThanMd ? (
        <div
            className={`bg-offwhite h-[88px] flex flex-row gap-12 justify-start items-center`}
        >
            <div
                className={`font-['Dela_Gothic_One']  text-[20px] p-[0px] pr-[30px] pl-[30px] border-r-2 border-greyry`}
            >
                GlobalTalk
            </div>
            <div className={`gap-8 flex flex-row`}>
                <div>
                    <Link className="hover:font-semibold" href="/">
                        Home
                    </Link>
                </div>
                <div>
                    <Link className="hover:font-semibold" href="/">
                        Course
                    </Link>
                </div>
            </div>
            {isLogin ? (
                <div className="ml-auto mr-8 flex flex-row gap-10">
                    <UnstyledButton>
                        <Group>
                            <Avatar size={40} color="blue">
                                {fLetter}
                            </Avatar>
                            <div>
                                <Text>{name}</Text>
                            </div>
                        </Group>
                    </UnstyledButton>
                    <div className="self-center">
                        <Link href="/" className="font-bold">
                            Sign Out ➜
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="ml-auto mr-8 flex flex-row gap-10">
                    <Link href="/" className="font-bold">
                        Login
                    </Link>
                </div>
            )}
        </div>
    ) : (
        <div>
            <div className="flex flex-row justify-between h-[50px] items-center bg-offwhite">
                <div className="ml-[20px]">
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        title={title}
                    />
                    <Drawer
                        opened={opened}
                        onClose={() => setOpened(false)}
                        padding="xl"
                        size={230}
                        position="top"
                        overlayBlur={3}
                        overlayOpacity={0.5}
                    >
                        <div className="flex flex-col  items-center h-[150px]">
                            <div className="w-[100vw] h-[50px] flex hover:bg-offwhite items-center justify-center ">
                                <Link className="hover:font-semibold" href="/">
                                    Home
                                </Link>
                            </div>
                            <div className="w-[100vw] h-[50px] flex items-center justify-center hover:bg-offwhite ">
                                <Link className="hover:font-semibold" href="/">
                                    Course
                                </Link>
                            </div>
                            <div className="w-[100vw] h-[50px] flex items-center justify-center hover:bg-offwhite ">
                                <Link className="hover:font-semibold" href="/">
                                    Sign Out ➜
                                </Link>
                            </div>
                        </div>
                    </Drawer>
                </div>
                <div
                    className={`font-['Dela_Gothic_One'] justify-self-center  ml-[24px]  `}
                >
                    GlobalTalk
                </div>
                {isLogin ? (
                    <div>
                        <UnstyledButton>
                            <Group spacing={10}>
                                <Avatar size={40} color="blue">
                                    {}
                                </Avatar>
                                <div className="mr-[10px] ">
                                    <Text>{splitt[0]}</Text>
                                </div>
                            </Group>
                        </UnstyledButton>
                    </div>
                ) : (
                    <div className="mr-[20px] ">
                        <Link href="/" className="font-bold">
                            Login
                        </Link>
                    </div>
                )}
            </div>
            <hr></hr>
        </div>
    );
};
export default NavBar;
