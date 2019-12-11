import axios from 'axios';

class Auth {
  constructor() {
    this.auth = axios.create({
      // baseURL: 'http://192.168.1.63:3000',
      baseURL: 'http://localhost:5000',
      withCredentials: true,
    });
  }

  signup(user) {
    console.log(user);
    const { username, password, photoUrl } = user;
    return this.auth
      .post('/auth/signup', { username, password, photoUrl })
      .then(({ data }) => data);
  }
  imageUpload(file) {
    return this.auth.post('/auth/signup/image', file)
    .then(({data}) => data)
  }
  login(user) {
    const { username, password } = user;
    return this.auth
      .post('/auth/login', { username, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/auth/logout', {}).then(response => response.data);
  }

  me() {
    return this.auth.get('/auth/me').then(response => response.data);
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
