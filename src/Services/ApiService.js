import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 20000
});

let refreshCall = false;
let refreshSubscribers = []; // Queue for requests waiting for token refresh

// Function to retry all queued requests with the new token
const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

let authTokenMemory = null;
let refreshTokenMemory = null;

let memoryTokens = {
  authToken: null,
  refreshToken: null
};

// Helper functions to manage in-memory tokens
export const setMemoryTokens = (token, refreshToken) => {
  authTokenMemory = token;
  refreshTokenMemory = refreshToken;
}

// Helper functions to sync memory with sessionStorage
const syncMemoryTokens = () => {
  memoryTokens = {
    authToken: sessionStorage.getItem("authToken"),
    refreshToken: sessionStorage.getItem("refreshToken")
  };
};

// Initialize on first load
syncMemoryTokens();;

export const getAuthToken = () => authTokenMemory;
export const getRefreshToken = () => refreshTokenMemory;
export const clearMemoryTokens = () => {
  authTokenMemory = null;
  refreshTokenMemory = null;
};

// Request Interceptor
apiClient.interceptors.request.use(


  (config) => {

     syncMemoryTokens(); // Ensure latest tokens
    //const token = localStorage.getItem("authToken");
     const token = getAuthToken(); 
  if (memoryTokens.authToken) {
    config.headers.Authorization = `Bearer ${memoryTokens.authToken}`;
  }
  return config;
},
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error("Error in request interceptor:", error);
//     return Promise.reject(error);
//   }
// );

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {

      syncMemoryTokens();
      
      // Get latest tokens
      if (refreshCall) {
        // If a refresh is already in progress, queue the request
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      console.log("Token expired. Attempting to refresh...");
      originalRequest._retry = true; // Mark the request as retried
      refreshCall = true;

      //const refreshTkn = localStorage.getItem("refreshToken");
     // const refreshTkn = getRefreshToken();
     const refreshTkn = memoryTokens.refreshToken
      if (refreshTkn) {
        try {
          // Refresh the token
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
            refreshToken: refreshTkn,
          });

          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          // Store new tokens
          // localStorage.setItem("authToken", newAccessToken);
          // // localStorage.setItem("refreshToken", newRefreshToken);
          // console.log("New tokens set:", newAccessToken, newRefreshToken);
           setMemoryTokens(newAccessToken, newRefreshToken);

           sessionStorage.setItem("authToken", newAccessToken);
          sessionStorage.setItem("refreshToken", newRefreshToken);
          memoryTokens = { 
            authToken: newAccessToken,
            refreshToken: newRefreshToken
          };

          // Update Authorization header
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request
          refreshCall = false;
          onRefreshed(newAccessToken); // Retry all queued requests
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          refreshCall = false;
         sessionStorage.clear();
          // Clear tokens and redirect to login
          // localStorage.removeItem("authToken");
          // localStorage.removeItem("refreshToken");
          clearMemoryTokens();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, redirect to login
        // localStorage.removeItem("authToken");
        // localStorage.removeItem("refreshToken");
        clearMemoryTokens();
        sessionStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    // Handle 403 Forbidden errors
    if (error.response && error.response.status === 403) {
      // localStorage.removeItem("authToken");
      // localStorage.removeItem("refreshToken");
       clearMemoryTokens();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);



export const refreshAccessToken = (refreshTkn) => {
  console.log("refresh token before calling ", refreshTkn)
  return apiClient.post(`/auth/refresh-token`, { refreshToken: refreshTkn })
}
export const checkPasswordStatus = () => {
  return apiClient.get(`/password/status`)
}
