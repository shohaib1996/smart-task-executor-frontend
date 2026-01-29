import { apiClient } from "./client";

export const authApi = {
  getGoogleAuthUrl: async (): Promise<{ auth_url: string }> => {
    const { data } = await apiClient.get("/api/auth/google");
    return data;
  },
  logout: async () => {
    return apiClient.post("/api/auth/logout");
  },
  getMe: async () => {
    const { data } = await apiClient.get("/api/auth/me");
    return data;
  },
  updateTimezone: async (timezone: string): Promise<{ message: string; timezone: string }> => {
    const { data } = await apiClient.put("/api/auth/timezone", { timezone });
    return data;
  },
};
