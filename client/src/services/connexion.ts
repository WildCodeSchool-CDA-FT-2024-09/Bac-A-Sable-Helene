// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL
// });

// export default instance;


import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
  credentials: "include", // Nécessaire pour transmettre les cookies
  headers: {
    Cookie: `cdatokenexample=${localStorage.getItem('cdatokenexample')}`, // Si cdatokenexample est stocké dans localStorage
  },

});

export default client;