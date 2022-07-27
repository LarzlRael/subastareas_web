import axios, { AxiosRequestConfig } from 'axios'
const instancia = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
})
instancia.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('token') || 'invalidToken'
    if (token) {
      config.headers!.Authorization = 'Bearer ' + token
      return config
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)
export const getAction = async (url: string) => {
  try {
    const axios = await instancia.get(url)
    return axios
  } catch (error) {
    return error
  }
}
export const postAction = async (axiosRequestConfig: AxiosRequestConfig) => {
  /* return new Promise((resolve, eject) => {
    instancia
      .post(axiosRequestConfig.url!, axiosRequestConfig.data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error.response);
        resolve(error.response);
      });
  }); */
  try {
    console.log('submint post')
    const axios = await instancia.post(
      axiosRequestConfig.url!,
      axiosRequestConfig.data,
    )
    return axios
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error
    } else {
      console.log('unexpected error: ', error)
      return 'An unexpected error occurred'
    }
  }
}
export const putAction = async (axiosRequestConfig: AxiosRequestConfig) => {
  try {
    const axios = await instancia.put(
      axiosRequestConfig.url!,
      axiosRequestConfig.data,
    )
    return axios
  } catch (error) {
    return error
  }
}
