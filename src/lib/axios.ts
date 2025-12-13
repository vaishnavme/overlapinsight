import axios from "axios";

type ApiVersion = "v1" | "v2";

const createInstance = (version: ApiVersion) => {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_FE_URL}/api/${version}`,
  });

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
  );

  return instance;
};

export const apiV1 = createInstance("v1");
