import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

interface IUser {
    name: string;
    imageUrl: string;
}

interface IUserContext {
    user: IUser | null;
    isAuth: boolean;
    ready: boolean;
    login: () => Promise<void>;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
}

const UserContext = createContext<IUserContext>({
    user: null,
    isAuth: false,
    ready: false,
    login: async () => {},
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

    const login = useCallback(async () => {
        //login
        setUser({
            name: "john",
            imageUrl: "",
        });
        setAuth(true);
    }, []);
    const refresh = useCallback(async () => {}, []);
    const logout = useCallback(async () => {
        //fetch logout api...
        setUser(null);
        setAuth(false);
    }, []);

    useEffect(() => {
        refresh();
    }, []);

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
