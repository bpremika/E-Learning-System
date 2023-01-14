import axios from "axios";
import { Router } from "express";
import { useRouter } from "next/router";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { client } from "../axios/axios";

interface IUser {
    username: string;
    role: "student" | "instructor";
    userID: number;
}
interface unp {
    username: string;
    password: string;
}
interface IUserContext {
    user: IUser | null;
    isAuth: boolean;
    ready: boolean;
    login: (unp: unp, isStudent: boolean) => Promise<boolean>;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
}

const UserContext = createContext<IUserContext>({
    user: null,
    isAuth: false,
    ready: false,
    login: async () => {
        return false;
    },
    refresh: async () => {},
    logout: async () => {},
});

export function useUser() {
    return useContext(UserContext);
}

export function UserContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuth, setAuth] = useState(false);
    const [ready, setReady] = useState(false);
    const router = useRouter();

    const login = async (unp: unp, isStudent: boolean) => {
        let userType = isStudent ? "student" : "instructor";
        try {
            const res = await client.post(`/user/${userType}Login`, unp);
            const userJSON = await client.get("/user/me");
            const nuser = userJSON.data as IUser;
            setUser(nuser);
            console.log();
            isStudent ? router.push("/") : router.push(`/Dashboard/`);
            return true;
        } catch (e) {
            return false;
        }

        //login
    };
    const refresh = useCallback(async () => {
        if (!isAuth) return;
        try {
            const userJSON = await client.get("/user/me");

            const user = userJSON.data as IUser;

            setUser(user);
        } catch (e) {
            console.log(e);
        }
    }, []);
    const logout = useCallback(async () => {
        //fetch logout api...
        try {
            await client.get("/user/logout");
            setUser(null);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        if (user) {
            setAuth(true);
        } else {
            setAuth(false);
        }
        setReady(true);
    }, [user]);

    const value: IUserContext = {
        user,
        isAuth,
        ready,
        login,
        refresh,
        logout,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}
