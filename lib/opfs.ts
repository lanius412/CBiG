import { IcalFile } from "@/types/types";

export const opfs_app_dir = "characters-birthday-ical-generator";

export const saveFileToOPFS = async (icalFile: IcalFile) => {
  try {
    const root = await navigator.storage.getDirectory();
    const app_dir = await root.getDirectoryHandle(opfs_app_dir, {
      create: true,
    });

    const fileHandle = await app_dir.getFileHandle(icalFile.name, {
      create: true,
    });
    const writable = await fileHandle.createWritable();
    await writable.write(icalFile.content);
    await writable.close();
    return true;
  } catch (error) {
    console.error("Failed to save file to OPFS:", error);
    return false;
  }
};

export const getFileListFromOPFS = async (): Promise<IcalFile[] | null> => {
  try {
    const root = await navigator.storage.getDirectory();
    const app_dir = await root.getDirectoryHandle(opfs_app_dir, {
      create: true,
    });

    const fileList: IcalFile[] = [];
    for await (const entry of app_dir.values()) {
      if (entry.kind === "file") {
        const fileHandle = entry as FileSystemFileHandle;
        const file = await fileHandle.getFile();
        const fileContent = await file.text();
        fileList.push({ name: file.name, content: fileContent });
      }
    }
    return fileList;
  } catch (error) {
    console.error("Failed to get file list from OPFS:", error);
    return null;
  }
};

export const getFileFromOPFS = async (
  filename: string,
): Promise<IcalFile | null> => {
  try {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle(filename);
    const file = await fileHandle.getFile();
    const fileContent = await file.text();
    return { name: fileHandle.name, content: fileContent };
  } catch (error) {
    console.error("Failed to get file from OPFS:", error);
    return null;
  }
};

export const deleteFileFromOPFS = async (filename: string): Promise<void> => {
  try {
    const root = await navigator.storage.getDirectory();
    const app_dir = await root.getDirectoryHandle(opfs_app_dir);
    app_dir.removeEntry(filename);
  } catch (error) {
    console.error("Failed to delete file from OPFS:", error);
  }
};
