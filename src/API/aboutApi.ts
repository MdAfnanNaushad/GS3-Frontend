import axiosInstance from "./axiosInstance";

export const fetchAbout = () => axiosInstance.get("/about");

export const updateStats = (stats: { label: string; value: string }[]) =>
  axiosInstance.put("/about/stats", { stats });

export const addTimeline = (data: FormData) =>
  axiosInstance.post("/about/timeline", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateTimeline = (id: string, data: FormData) =>
  axiosInstance.put(`/about/timeline/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteTimeline = (id: string) =>
  axiosInstance.delete(`/about/timeline/${id}`);
