import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.plaid)["create-link-token"]["$post"],
  200
>;

export const useCreateLinkToken = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.plaid["create-link-token"].$post();

      if (!response.ok) {
        throw Error("Failed To Create Link Token");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Link Token Created");
    },
    onError: () => {
      toast.error("Failed To Create Link Token");
    },
  });

  return mutation;
};
