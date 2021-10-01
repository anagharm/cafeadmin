import AxiosInstance from "../axiosSetting/Axios"

const Fetcher =  (urlMethod,urlAPI,urlBody) => AxiosInstance({
    method  : urlMethod,
    url     : urlAPI,
    data    : urlBody
})

export default Fetcher