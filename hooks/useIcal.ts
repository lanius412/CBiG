import { IcalFile } from "@/types/types";
import { useState } from "react";
import { getFileListFromOPFS, deleteFileFromOPFS } from "@/lib/opfs";

interface UseIcalReturn {
  icalFiles: IcalFile[] | null;
  downloadIcal: (icalFile: IcalFile) => Promise<void>;
  deleteIcal: (icalFile: IcalFile) => Promise<void>;
  fetchFiles: () => Promise<void>;
  setFilename: (filename: string) => void;
  filename: string;
  isLoading: boolean;
  error: string | null;
}

export const useIcal = (): UseIcalReturn => {
  const [icalFiles, setIcalFiles] = useState<IcalFile[] | null>(null);
  const [filename, setFilenameState] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setFilename = (filename: string) => {
    setFilenameState(filename);
  };

  const fetchFiles = async () => {
    setIsLoading(true);
    setError(null);
    const files = await getFileListFromOPFS();
    if (!files) {
      setError("Failed to fetch iCal files");
      setIsLoading(false);
      return;
    }
    setIcalFiles(files);
    setIsLoading(false);
  };

  const downloadIcal = async (icalFile: IcalFile) => {
    try {
      const blob = new Blob([icalFile.content], { type: "text/calendar" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = icalFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      setError("Failed to download an iCal file");
    }
  };

  const deleteIcal = async (icalFile: IcalFile) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteFileFromOPFS(icalFile.name);
      fetchFiles();
    } catch (error) {
      console.error(error);
      setError("Failed to delete an iCal file");
    }
    setIsLoading(false);
  };

  return {
    icalFiles,
    downloadIcal,
    deleteIcal,
    fetchFiles,
    setFilename,
    filename,
    isLoading,
    error,
  };
};
