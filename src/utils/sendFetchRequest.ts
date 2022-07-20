import { NetworkError } from "../types/NetworkError";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? "";

export const sendFetchRequest = (url: string) =>
  fetch(`${BACKEND_URL}${url}`).then((response) => {
    if (!response.ok) {
      throw new NetworkError(
        `Request returned error ${response.status}`,
        response.status
      );
    }

    return response.json();
  });
