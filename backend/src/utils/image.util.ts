import fs from 'fs';

export const deleteImage = (filePath: string | undefined): void => {
  if (filePath) {
    fs.unlink(filePath, (err) => {
      console.log(`Image "${filePath}" has been deleted successfully`);
      if (err) console.error(err);
    });
  }
};
