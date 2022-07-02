import axios from 'axios';

class HttpService {
  get(url: string) {
    return axios.get(url);
  }
}

export default new HttpService();
