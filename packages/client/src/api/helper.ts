import { QueryParam } from "../types";

export const fetchFromApi = async (url: string, params?: QueryParam) => {
  const urlObject = new URL(url);

  if (params) {
    urlObject.search = new URLSearchParams(params).toString();
  }

  try {
    const response = await fetch(urlObject.toString());

    if (!response.ok) {
      console.error(`Failed to fetch from ${urlObject.toString()}`);
      return;
    }

    return response.json();
  } catch (error) {
    console.error(`Error while fetching from ${url}`, error);
    return;
  }
};
