import fs from 'fs/promises';

export const deleteUploadedFile = async (filePath: string | undefined): Promise<void> => {
  if (!filePath) {
    console.warn('No File path');
   return;
  }

  try {
    await fs.unlink(filePath);
    console.log(`File ${filePath} deleted successfully.`);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      console.warn(`File ${filePath} not found. Skipping deletion.`);
    } else {
      console.warn(`Failed to delete file ${filePath}:`, err);
      // throw err; // Re-throw to let the caller handle it
    }
  }
};
