"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3Client = new aws_sdk_1.default.S3({
    endpoint: process.env.DO_SPACES_URL,
    region: "sgp1",
    credentials: {
        accessKeyId: process.env.DO_SPACES_ID,
        secretAccessKey: process.env.DO_SPACES_SECRET,
    },
});
exports.config = {
    api: {
        bodyParser: false,
    },
};
function uploadFile(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const files =
            (_a = req.files) === null || _a === void 0
                ? void 0
                : _a.selected_file;
        if (!files || files.length == 0) {
            res.status(400).send("Invalid file");
            return;
        }
        console.log(files);
        const file = files[files.length - 1];
        try {
            s3Client.putObject(
                {
                    Bucket: process.env.DO_SPACES_BUCKET,
                    Key: (_b = file.name) !== null && _b !== void 0 ? _b : "",
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
    });
}
exports.default = uploadFile;
