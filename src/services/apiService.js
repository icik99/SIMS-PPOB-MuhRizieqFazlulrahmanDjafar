import axios from "axios";

const apiUrl = "https://take-home-test-api.nutech-integrasi.com";

const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const excludedEndpoints = ["/login", "/registration"];

    if (!excludedEndpoints.includes(config.url)) {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Harap login terlebih dahulu.");
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (payload) => {
  const response = await apiClient.post("/registration", payload);
  return response.data;
};
export const loginUser = async (payload) => {
  const response = await apiClient.post("/login", payload);
  return response.data;
};

export const topUp = async (payload) => {
  const response = await apiClient.post("/topup", payload);
  return response.data;
};

export const transaction = async (payload) => {
  const response = await apiClient.post("/transaction", payload);
  return response.data;
};

export const getHistoryTransaction = async (offset, limit) => {
  const response = await apiClient.get(
    `/transaction/history?offset=${offset}&limit=${limit}`
  );
  return response.data;
};

export const updateProfile = async (payload) => {
  const response = await apiClient.put("/profile/update", payload);
  return response.data;
};

export const updateProfilePicture = async (payload) => {
  const response = await apiClient.put("/profile/image", payload);
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get("/profile");
  return response.data;
};

export const getServices = async () => {
  const response = await apiClient.get("/services");
  return response.data;
};

export const getBanner = async () => {
  const response = await apiClient.get("/banner");
  return response.data;
};

export const getBalance = async () => {
  const response = await apiClient.get("/balance");
  return response.data;
};
