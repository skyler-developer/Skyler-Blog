import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ins } from "../axios/baseUrl";

const AuthContext = createContext(null);

function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        ins.get("/getuser")
            .then((res) => {
                if (res.status === 200) {
                    setUser(true);
                }
            })
            .catch((err) => {
                setUser(false);
                console.log(err);
            });
    }, []);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

function RequireAuth(props) {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    }
    return props.children;
}

export { useAuth, AuthProvider, RequireAuth };
