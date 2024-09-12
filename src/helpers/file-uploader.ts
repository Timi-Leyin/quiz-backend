import { FILE_TYPE } from "@prisma/client";
import cloudinary from "../config/cloudinary";
import { db } from "../config/database";
import { rmSync } from "fs";

interface Uploader {
  src: string;
  identifier?: string;
}

const fileUploader = async ({ src, identifier }: Uploader) => {
  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader.upload(src, {
      public_id: identifier,
    });

    // store in database
    // TODO [] SAVE IMAGE METADATA (WIDTH, HEIGHT ETC)
    const file = await db.file.create({
      data: {
        src: uploadResult.secure_url,
        provider: "CLOUDINARY",
        type: fileType(uploadResult.resource_type),
      },
    });
    return file;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    rmSync(src);
  }
};

export const bulkFileUploader = async (upload: Uploader[]) => {
  const bulkFiles = upload.map(
    async (up) => await fileUploader({ src: up.src, identifier: up.identifier })
  );

  const bulk = (await Promise.all(bulkFiles)).map((up) => up);
  return bulk.filter((b) => b != null);
};

const fileType = (type: string): FILE_TYPE => {
  let output: FILE_TYPE;

  switch (type) {
    case "image":
      output = FILE_TYPE.IMAGE;
      break;
    case "video":
      output = FILE_TYPE.VIDEO;
      break;
    case "raw":
      output = FILE_TYPE.DOCUMENT;
      break;
    default:
      output = FILE_TYPE.OTHERS;
  }

  return output;
};

export const checkFileArray = (
  files: Express.Multer.File[],
  fieldName: string
) => {
  return files.filter((file) => file.fieldname == fieldName).length > 0;
};

export default fileUploader;
