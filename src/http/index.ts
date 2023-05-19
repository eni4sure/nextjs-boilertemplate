import $http from "./xhr";

export const authLogin = async (data: any) => $http.post("/auth/login", data).then((res) => res.data);
export const authRegister = async (data: any) => $http.post("/auth/register", data).then((res) => res.data);

export const userGetMe = async () => $http.get(`/users/get-current`).then((res) => res.data);
