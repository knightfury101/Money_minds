import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetConnectedBank = () => {
  const query = useQuery({
    queryKey: ["connected-bank"],
    queryFn: async () => {
      const response = await client.api.plaid["connected-bank"].$get();
      if (!response.ok) {
        throw new Error("Failed To Fetch Connected Bank");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
