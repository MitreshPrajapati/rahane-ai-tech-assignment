import axios from "axios";
import { useCallback } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const useApi = () => {

  const token = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("token")) || ""
    : "";
  // console.log(token)
  const request = useCallback(
    async ({ method = "GET", endpoint, body = null, params = {} }) => {
      const fullURL = `${BASE_URL}${endpoint}`;
      // console.log("API Request to:", fullURL);

      try {
        if (!endpoint) {
          throw new Error("API endpoint is required");
        }

        const res = await axios({
          method,
          url: fullURL,
          data: body || undefined,
          params: params || undefined,
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
          },
        });
        return res;
      } catch (error) {
        console.error("API Error:", error.response || error.message);
        throw error.response?.data || { message: error.message };
      }
    },
    [token]
  );

  return { request };
};
