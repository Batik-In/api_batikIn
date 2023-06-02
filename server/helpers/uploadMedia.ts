import storage from '../config/storage';

const bucket = storage.bucket(process.env.GCLOUD_BUCKET || '');

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

export const uploadMedia = (file: any) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;
  console.log('Upload Media !!');
  const blob = bucket.file(originalname.replace(/ /g, "_"));

  blob.save(buffer, (err: any) => {
    if (err) {
      console.log(err);
      reject(`Unable to upload image, something went wrong`);
      return;
    }

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    resolve(publicUrl);
  });
});