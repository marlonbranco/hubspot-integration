import axios from 'axios';

const hubSpotURL = process.env.HUBSPOT_API_URL;

export const hubSpotApi = axios.create({
  baseURL: hubSpotURL,
  timeout: 60000,
});
