import axios, { AxiosRequestConfig } from "axios";

const get = async (url : any) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if(axios.isAxiosError(error)){
            throw error.response?.data;
        } else {
            throw error;
        }
    }
};

const post = async (url: string, body: any, header?: AxiosRequestConfig | undefined) => {
    try {
      const response = await axios.post(url, body, header);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data;
      } else {
        throw error;
      }
    }
};  


  const API = {
    get,
    post
}

export default API