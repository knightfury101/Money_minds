"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateLinkToken } from "../api/use-create-link-token";
import { useMount } from "react-use";
import { usePlaidLink } from "react-plaid-link";
import { useExchangePublicToken } from "../api/use-exchange-public-token copy";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

export const PlaidConnect = () => {
  const [token, setToken] = useState<string | null>(null);
  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();
  const createLinkToken = useCreateLinkToken();
  const exchangePublicToken = useExchangePublicToken();
  useMount(() => {
    createLinkToken.mutate(undefined, {
      onSuccess: ({ data }) => {
        setToken(data);
      },
    });
  });

  const plaid = usePlaidLink({
    token: token,
    onSuccess: (publicToken) => {
      exchangePublicToken.mutate({ publicToken });
    },
    env: "sandbox",
  });

  const isDisabled = !plaid.ready || exchangePublicToken.isPending || isLoading;

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }
    plaid.open();
  };

  return (
    <Button size="sm" variant="ghost" disabled={isDisabled} onClick={onClick}>
      Connect
    </Button>
  );
};
