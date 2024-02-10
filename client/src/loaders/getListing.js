import api from "../utils/api";

export const getListing = async ({ params }) => {
  return (await api.get(`/listing/?listingId=${params.id}`)).data;
};
