import { apiV1 } from "./axios";

const fundsAPI = {
  search(query?: string) {
    return apiV1.get("/fund/search", { params: { query } });
  },
};

export { fundsAPI };
