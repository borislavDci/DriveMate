import api from "../utils/api";

export const getAllListings = async ({ request }) => {
  const url = new URL(request.url);
  const startDate = url.searchParams.get("startDate");
  const endDate = url.searchParams.get("endDate");
  const location = url.searchParams.get("location");

  const baseUrl = api.defaults.baseURL;
  const path = "api/listing/all";
  const queryParams = {
    startDate: startDate,
    endDate: endDate,
    location: location,
  };

  console.log(Object.entries(queryParams));
  const apiUrl = new URL(path, baseUrl);

  console.log(startDate, endDate, location);

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value === null) return;
    apiUrl.searchParams.append(key, value);
  });

  const res = await api.get(apiUrl);
  const data = res.data.reverse();
  return data;
};
