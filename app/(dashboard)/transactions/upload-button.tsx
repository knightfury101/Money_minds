import { Button } from "@/components/ui/button";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

type Props = {
  onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();
  const { shouldBlock, triggerPaywall } = usePaywall();

  if (shouldBlock) {
    return (
      <Button className="w-full lg:w-auto" size="sm" onClick={triggerPaywall}>
        <Upload className="size-4 mr-2" />
        Import
      </Button>
    );
  }

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button className="w-full lg:w-auto" size="sm" {...getRootProps()}>
          <Upload className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};
