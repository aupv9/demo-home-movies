import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: "06a3adbdd72c81b21621ce9f9af3628b",
  },
});
