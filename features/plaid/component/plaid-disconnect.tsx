"use client";

import { Button } from "@/components/ui/button";
import { useDeleteConnectedBank } from "../api/use-delete-connected-bank";
import { useConfirm } from "@/hooks/use-confirm";

export const PlaidDisconnect = () => {
  const [Dialog, confirm] = useConfirm(
    "Are You Sure?",
    "This Will DELETE Your Bank Account, And All The Associated Data With It."
  );
  const deleteConnectedBank = useDeleteConnectedBank();

  const onClick = async () => {
    const ok = await confirm();
    if (ok) {
      deleteConnectedBank.mutate();
    }
  };

  return (
    <>
      <Dialog />
      <Button
        size="sm"
        variant="ghost"
        disabled={deleteConnectedBank.isPending}
        onClick={onClick}
      >
        Disconnect
      </Button>
    </>
  );
};
