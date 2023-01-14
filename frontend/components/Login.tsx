import { PasswordInput, TextInput } from "@mantine/core";
import React, { useRef } from "react";
import { useUser } from "../common/contexts/UserContext";
import Register from "./Register";

interface props {
    isStudent: boolean;
}
interface user {
    username: string;
    password: string;
}
const Login = ({ isStudent }: props) => {
    let bgColor = isStudent ? "bg-offwhite" : "bg-cyandark";
    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { login } = useUser();

    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userRef.current || !passwordRef.current) {
            return;
        }
        const user: user = {
            username: userRef.current?.value,
            password: passwordRef.current?.value,
        };
        login(user, isStudent);
    };
    let userType = isStudent ? "Student" : "Instructor";
    let fontColor = isStudent ? "text-cyandark" : "text-offwhite";
    return (
        <div
            className={`${bgColor} p-[10px] w-[auto] md:w-[30vw] h-[500px] rounded-lg flex flex-col gap-[20px] justify-center items-center`}
        >
            <div
                className={`${fontColor} text-xl md:text-3xl font-['Montserrat'] font-bold text-center`}
            >
                Login as {userType}
            </div>
            <form
                className="flex flex-col gap-[20px] justify-center items-center"
                onSubmit={loginHandler}
            >
                <div className="pr-[15px] pl-[15px]">
                    <TextInput
                        placeholder="username"
                        required
                        radius={20}
                        ref={userRef}
                    />
                </div>
                <div className="pr-[15px] pl-[15px] w-full">
                    <PasswordInput
                        placeholder="Password"
                        required
                        radius={20}
                        ref={passwordRef}
                    />
                </div>
                <div className="w-fit">
                    <button
                        type="submit"
                        className="px-4 text-[16px] py-1 bg-FFA text-stone-500 rounded-[20px]"
                    >
                        Login
                    </button>
                </div>
            </form>
            <div
                className={`${
                    isStudent ? "text-stone-500" : "text-stone-200"
                } text-sm`}
            >
                <p className="text-center">Not a member?</p>
                <Register isStudent={isStudent} />
            </div>
        </div>
    );
};
export default Login;
