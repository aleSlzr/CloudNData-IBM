import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://ibm-music-server.mybluemix.net/`//`http://localhost:8081`
  })
}