import fetcher from "@/utils/fetcher";

export const getCirujiasService = async () => {
  const endpoint = `api/v1/encounters`;
  return await fetcher(endpoint);
};

export const createExampleData = async (data) => {
  const endpoint = `example-endpoint`;
  return await fetcher(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
  });
};