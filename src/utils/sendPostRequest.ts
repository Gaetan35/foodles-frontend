import { NetworkError } from "../types/NetworkError";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? "";

export const sendPostRequest = async (url: string, payload: any) => {
  const response = await fetch(`${BACKEND_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new NetworkError(
      `Request returned error ${response.status}`,
      response.status
    );
  }

  return response.json();
};
