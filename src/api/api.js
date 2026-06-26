const BASE = process.env.REACT_APP_API_URL;

export const getToken = () => {
    return localStorage.getItem("token");
};

export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const logout = () => {

    removeToken();

    window.location.href = "/";
};

export const isAuthenticated = () => {
    return !!getToken();
};

export const api = async (url, options = {}) => {

    const response = await fetch(`${BASE}${url}`, {

        ...options,

        headers: {

            "Content-Type": "application/json",
            "X-App-Name": "app1",

            ...(getToken()
                ? { Authorization: `Bearer ${getToken()}` }
                : {}),

            ...(options.headers || {})
        }
    });

    if (!response.ok) {

        const text = await response.text();

        throw new Error(text || "API Error");
    }

    return response.json();
};