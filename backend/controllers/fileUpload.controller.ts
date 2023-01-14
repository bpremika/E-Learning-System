import AWS from "aws-sdk";
import { Response, Request } from "express";
import { UploadedFile } from "express-fileupload";

const s3Client = new AWS.S3({
    endpoint: process.env.DO_SPACES_URL,
    region: "sgp1",
    credentials: {
        accessKeyId: process.env.DO_SPACES_ID!,
        secretAccessKey: process.env.DO_SPACES_SECRET!,
    },
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function uploadFile(req: Request, res: Response) {
    const files = req.files?.selected_file;
    if (!files) {
        res.status(400).send("Invalid file");
        return;
    }
    console.log(files);

    const file = Array.isArray(files) ? files[files.length - 1] : files;
    try {
        s3Client.putObject(
            {
                Bucket: process.env.DO_SPACES_BUCKET!,
                Key: file.name ?? "",
                Body: file.data,
                ACL: "public-read",
            },
            (e) => {
                res.status(201).send(e);
                return;
            }
        );
    } catch (e) {
        console.log(e);
        res.status(500).send("Error uploading file");
    }
}

