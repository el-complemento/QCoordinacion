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

export const getPacientes = async() => {
  const endpoint = `api/v1/patients/cedulas`;
  return await fetcher(endpoint);
}
export const getMedicos = async() => {
  const endpoint = `api/v1/practicioners`;
  return await fetcher(endpoint);
}