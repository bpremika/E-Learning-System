import fs from "fs";
import aws from "aws-sdk";
import { Request, Response } from "express";

const multer = require("multer");
const multerS3 = require("multer-s3");
const spacesEndpoint = new aws.Endpoint("sgp1.cdn.digitaloceanspaces.com");
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    credentials :{
        accessKeyId : process.env.AWS_KEY_ID!,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY!,
    }
});
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "hacktoschool",
        acl: "public-read",
        key: function (request: Request, file: any, cb: any) {
            console.log(file);
            cb(null, file.originalname);
        },
    }),
}).array("upload", 1);

export default async function uploadFile(req: Request,res: Response,next: any) {
    upload(req, res, function (error: any) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
            return;
        }
        res.status(200).json("File uploaded successfully.");
    });
}
