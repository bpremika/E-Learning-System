import fs from "fs";
import AWS from "aws-sdk";
import formidable, { File } from "formidable";

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

export default async function handler(req: any, res: any) {
    const form = formidable();
    console.log("Uploading");
    form.parse(req, async (err, fields, files) => {
        if (!files.demo) {
            res.status(400).send("No file upload");
            return;
        }
        try {
            return s3Client.putObject(
                {
                    Bucket: process.env.DO_SPACES_BUCKET!,
                    Key: (files.demo as File).originalFilename ?? "",
                    Body: fs.createReadStream((files.demo as File).filepath),
                    ACL: "public-read",
                },
                async (e) => {
                    res.status(201).send(e);
                    return;
                }
            );
        } catch (e) {
            console.log(e);
            res.status(500).send("Error uploading file");
        }
    });
}
