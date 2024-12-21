"use client";

import { useEffect } from "react";
import { Download, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Alert from "@/components/alert";
import Loading from "@/components/loading";
import TooltipWrapper from "@/components/tooltip-wrapper";

import { useIcal } from "@/hooks/useIcal";

const iCalFilesList = () => {
  const {
    icalFiles,
    fetchFiles,
    isLoading: fileIsLoading,
    error,
    downloadIcal,
    deleteIcal,
  } = useIcal();

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="overflow-y-auto">
      {fileIsLoading && <Loading />}
      {error && (
        <Alert
          open={true}
          title="Fetching Error"
          description={error}
          onOpenChange={() => {}}
        />
      )}
      {icalFiles?.map((icalFile) => (
        <div
          key={icalFile.name}
          className="flex items-center justify-between py-2 border-b"
        >
          <Label className="text-lg">{icalFile.name}</Label>
          <div className="flex justify-between items-center gap-2">
            <TooltipWrapper hint="Download">
              <Button onClick={() => downloadIcal(icalFile)}>
                <Download />
              </Button>
            </TooltipWrapper>

            <TooltipWrapper hint="Trash">
              <Button
                variant="destructive"
                onClick={() => {
                  deleteIcal(icalFile);
                  fetchFiles();
                }}
              >
                <Trash />
              </Button>
            </TooltipWrapper>
          </div>
        </div>
      ))}
    </div>
  );
};

export default iCalFilesList;
