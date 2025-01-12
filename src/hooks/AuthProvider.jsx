import React, {useMemo, useContext, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./UseLocalStorage";
import AuthContext from '../context/AuthContext';

export function AuthProvider({children}) {

    const [user, setUser] = useLocalStorage("token", null);
    const navigate = useNavigate();
    const [errorLogin, setErrorLogin] = useState('');

    // call this function when you want to authenticate the user
    const login = async (formData) => {

        let option = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            method: "POST",
        }

        fetch(`http://localhost:8080/api/user/connect?username=${formData.username}&password=${formData.password}`, option)
        .then((response) => response.json())
        .then((response)=> {
            const data = response;
            if (!data.success) {
            setErrorLogin(data.message)
            } else {
                setUser("token", data.message);
                setUser(data.message);
                navigate("/");
            }
        })
        .catch((error) => {
            setErrorLogin(error);
        });
        console.log(errorLogin);
    };

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
        user,
        login,
        logout,
        errorLogin
        }),
        [user, errorLogin]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth () {
    return useContext(AuthContext);
}