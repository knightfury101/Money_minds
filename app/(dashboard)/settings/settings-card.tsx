"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetConnectedBank } from "@/features/plaid/api/use-get-connected-bank";
import { PlaidConnect } from "@/features/plaid/component/plaid-connect";
import { PlaidDisconnect } from "@/features/plaid/component/plaid-disconnect";
import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription";
import { SubscriptionCheckout } from "@/features/subscriptions/components/subscription-checkout";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const SettingsCard = () => {
  const { data: connectedBank, isLoading: isLoadingConnectedBank } =
    useGetConnectedBank();
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();

  if (isLoadingConnectedBank || isLoadingSubscription) {
    return (
      <Card className="border-none drop-shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl line-clamp-1">
            <Skeleton className="h-6 w-24" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="flex flex-col gap-y-2 lg:flex-row py-4 items-center">
          <p className="text-sm font-medium w-full lg:w-[16.5rem]">
            Bank Account
          </p>
          <div className="w-full flex items-center justify-between">
            <div
              className={cn(
                "text-sm truncate flex items-center",
                !connectedBank && "text-muted-foreground"
              )}
            >
              {connectedBank
                ? "Bank Account Connected"
                : "No Bank Account Connected"}
            </div>
            {connectedBank ? <PlaidDisconnect /> : <PlaidConnect />}
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-y-2 lg:flex-row py-4 items-center">
          <p className="text-sm font-medium w-full lg:w-[16.5rem]">
            Subscriptions
          </p>
          <div className="w-full flex items-center justify-between">
            <div
              className={cn(
                "text-sm truncate flex items-center",
                !subscription && "text-muted-foreground"
              )}
            >
              {subscription ? "Active Subscription" : "No Subscription Active"}
            </div>
            <SubscriptionCheckout />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
