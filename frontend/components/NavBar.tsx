import Link from "next/link";
import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import useMediaQuery from "../common/hook/mediaHook";
import { useContext, useState } from "react";
import { Burger, NavLink, Drawer } from "@mantine/core";
import { useUser } from "../common/contexts/UserContext";

const NavBar = () => {
    const { isAuth, user, logout, login } = useUser();
    const name = user?.name;
    let fLetter: String = "";
    if (isAuth) {
        fLetter = name!.length !== 0 ? name!.charAt(0) : "";
    }

    const handleOnSignOut = () => {
        logout();
    };
    const handleOnSignIn = () => {
        login();
    };
    const isBiggerThanMd = useMediaQuery("md");
    const splitt: string[] = name?.split(" ", 2) ?? [];
    const [opened, setOpened] = useState(false);
    const title = opened ? "Close navigation" : "Open navigation";
    return isBiggerThanMd ? (
        <>
            <div
                className={`bg-offwhite h-[88px] flex flex-row  items-center justify-around`}
            >
                <div className="flex flex-row">
                    <div
                        className={`font-['Dela_Gothic_One']  text-[20px] p-[0px] pr-[30px] pl-[30px] mr-[48px] border-r-2 border-greyry`}
                    >
                        GlobalTalk
                    </div>
                    <div className={`gap-6 flex flex-row items-center`}>
                        <Link
                            className="hover:font-semibold text-smoothgrey"
                            href="/"
                        >
                            <div>Home</div>
                        </Link>
                        <Link
                            className="hover:font-semibold text-smoothgrey"
                            href="/"
                        >
                            <div>Course</div>
                        </Link>
                        <Link
                            className="hover:font-semibold  text-smoothgrey"
                            href="/"
                        >
                            <div>Mycourses</div>
                        </Link>
                    </div>
                </div>

                {isAuth ? (
                    <div className=" mr-8 flex flex-row gap-10">
                        <UnstyledButton>
                            <Group>
                                <Avatar size={40} color="blue">
                                    {fLetter.toUpperCase()}
                                </Avatar>
                                <div>
                                    <span className="text-smoothgrey">
                                        {name}
                                    </span>
                                </div>
                            </Group>
                        </UnstyledButton>
                        <div className="self-center" onClick={handleOnSignOut}>
                            <button className="font-bold">Sign Out ➜</button>
                        </div>
                    </div>
                ) : (
                    <div className=" mr-8 flex flex-row gap-10">
                        <Link
                            href="/loginpage"
                            className="font-bold"
                            onClick={handleOnSignIn}
                        >
                            Sign in
                        </Link>
                    </div>
                )}
            </div>
            <hr className="h-[2px] bg-greyry"></hr>
        </>
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
                            <Link className="hover:font-semibold" href="/">
                                <div className="w-[100vw] h-[50px] flex hover:bg-offwhite items-center justify-center ">
                                    Home
                                </div>
                            </Link>
                            <Link className="hover:font-semibold" href="/">
                                <div className="w-[100vw] h-[50px] flex items-center justify-center hover:bg-offwhite ">
                                    Course
                                </div>
                            </Link>
                            <Link
                                className="hover:font-semibold"
                                href="/"
                                onClick={handleOnSignOut}
                            >
                                <div className="w-[100vw] h-[50px] flex items-center justify-center hover:bg-offwhite ">
                                    Sign Out ➜
                                </div>
                            </Link>
                        </div>
                    </Drawer>
                </div>
                <div
                    className={`font-['Dela_Gothic_One'] justify-self-center  ml-[24px]  `}
                >
                    GlobalTalk
                </div>
                {isAuth ? (
                    <div>
                        <UnstyledButton>
                            <Group spacing={10}>
                                <Avatar size={40} color="blue">
                                    {fLetter}
                                </Avatar>
                                <div className="mr-[10px] ">
                                    <span className="text-smoothgrey">
                                        {splitt[0]}
                                    </span>
                                </div>
                            </Group>
                        </UnstyledButton>
                    </div>
                ) : (
                    <Link href="/loginpage" className="font-bold">
                        <div className="mr-[20px] ">Sign in</div>
                    </Link>
                )}
            </div>
            <hr className="h-[2px] bg-greyry"></hr>
        </div>
    );
};
export default NavBar;
