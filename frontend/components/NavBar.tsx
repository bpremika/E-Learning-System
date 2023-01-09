import Link from "next/link";
import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import useMediaQuery from "../common/hook/mediaHook";
const NavBar = () => {
    const name: String = "H";
    let fLetter: String;
    fLetter = name.length !== 0 ? name.charAt(0) : "";
    const isBiggerThanMd = useMediaQuery("md");
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
            <div className="ml-auto mr-8 flex flex-row gap-10">
                <UnstyledButton>
                    <Group>
                        <Avatar size={40} color="blue">
                            {fLetter}
                        </Avatar>
                        <div>
                            <Text>Bob Handsome</Text>
                        </div>
                    </Group>
                </UnstyledButton>
                <div className="self-center">
                    <Link href="/" className="font-bold">
                        Sign Out ➜
                    </Link>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <div className="flex flex-row justify-between h-[50px] items-center">
                <div>Sign Out ➜</div>
                <div className={`font-['Dela_Gothic_One'] justify-self-center`}>
                    GlobalTalk
                </div>
                <div>
                    <Link href="/" className="font-bold mr-3">
                        Sign Out ➜
                    </Link>
                </div>
            </div>
            <hr></hr>
        </div>
    );
};
export default NavBar;
