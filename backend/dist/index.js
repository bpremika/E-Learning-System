"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const prisma_1 = require("./common/prisma");
const course_route_1 = require("./routes/course.route");
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./routes/user.route");
const fileUpload_controller_1 = __importDefault(require("./controllers/fileUpload.controller"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const corsOptions = {
    // origin: "*",
    allowedHeaders: "Origin, Content-Type, Accept",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.set("trust proxy", 1); // trust first proxy
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new prisma_session_store_1.PrismaSessionStore(prisma_1.prisma, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    }),
}));
app.use("/course", course_route_1.courseRouter);
app.get("/", () => {
    console.log("server connect");
});
app.use("/user", user_route_1.userRouter);
app.post("/upload", fileUpload_controller_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
