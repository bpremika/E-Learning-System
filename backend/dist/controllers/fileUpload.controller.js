"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer = require("multer");
const multerS3 = require("multer-s3");
const spacesEndpoint = new aws_sdk_1.default.Endpoint("sgp1.digitaloceanspaces.com");
const s3 = new aws_sdk_1.default.S3({
    endpoint: spacesEndpoint,
});
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "hacktoschool",
        acl: "public-read",
        key: function (request, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        },
    }),
}).array("upload", 1);
function uploadFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        upload(req, res, function (error) {
            if (error) {
                console.log(error);
                res.status(400).json(error);
            }
            console.log("File uploaded successfully.");
        });
    });
}
exports.default = uploadFile;
