export const fetchFromApi = async (
  url: string,
  params?: { [key: string]: any }
) => {
  let queryParams;

  if (params) {
    queryParams = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  if (queryParams) {
    url = `${url}?${queryParams}`;
  }

  try {
    const response = await fetch(url);

    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
  }
};
