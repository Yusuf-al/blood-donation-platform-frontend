import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const apiClinet = ofetch.create({
  baseURL: BASE_URL,
});

export default apiClinet;
