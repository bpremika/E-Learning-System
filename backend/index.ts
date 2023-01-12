import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import session, { Session, SessionData } from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./common/prisma";
import { courseRouter } from "./routes/course.route";
import cors from "cors";
import { userRouter } from "./routes/user.route";
import uploadFile from "./controllers/fileUpload.controller";

declare module "express-session" {
    interface SessionData {
        username: string;
        role: string;
    }
}

declare namespace Express {
    interface Request {
        session: Session & Partial<SessionData>;
    }
}
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:3000",
    allowedHeaders: "Origin, Content-Type, Accept",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.set("trust proxy", 1); // trust first proxy
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, sameSite: "none" },
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);

app.use("/course", courseRouter);
app.get("/", () => {
    console.log("server connect");
});
app.use("/user", userRouter);
app.post("/upload", uploadFile);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
