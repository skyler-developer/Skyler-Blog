import axios from "axios";
import { setToken, getToken, setRefreshToken, getRefreshToken } from "../token/token";
import { Navigate } from "react-router-dom";

// const baseUrl = "http://43.138.43.16:3007/api";
const baseUrl = "http://127.0.0.1:3007/api";

const ins = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `${getToken()}`,
    },
});

ins.interceptors.response.use(async (res) => {
    console.log(res);
    if (res.headers.authorization) {
        console.log("重新设置token");
        const token = res.headers.authorization;
        setToken(token);
        ins.defaults.headers.Authorization = `${token}`;
    }
    if (res.headers.refreshtoken) {
        const refreshToken = res.headers.refreshtoken;
        setRefreshToken(refreshToken);
    }
    if (res?.data?.code === 401 && !res?.config?.isFresh) {
        const refreshRes = await refreshToken();
        if (refreshRes) {
            res.config.headers.Authorization = getToken();
            console.log(res.config);
            console.log("重新请求原接口");
            await ins.request(res.config);
        } else {
            return <Navigate to="/login" />;
        }
        // return p;
    }
    return res;
});

let promise = null;
async function refreshToken() {
    if (promise) return promise;
    promise = new Promise(async (resolve, reject) => {
        console.log("刷新token");
        const res = await ins.get("/freshtoken", {
            headers: { authorization: getRefreshToken() },
            isFresh: true,
        });
        resolve(res.data.code == 201);
    });
    promise.finally(() => {
        promise = null;
    });
    return promise;
}

export { ins };

export default baseUrl;
