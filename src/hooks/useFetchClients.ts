import { useQuery } from "react-query";
import { apiRoutes } from "../routes/apiRoutes";
import { Client } from "../types/client";
import { sendFetchRequest } from "../utils/sendFetchRequest";

type FetchClientsResponse = Client[];

export const useFetchClients = () => {
  const { data: clients, refetch: refetchClients } = useQuery<
    FetchClientsResponse,
    Error
  >("fetchClients", () => sendFetchRequest(apiRoutes.fetchClients));

  return { clients, refetchClients };
};
