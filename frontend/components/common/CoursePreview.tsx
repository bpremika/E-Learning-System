import YoutubeVideo from "./YoutubeVideo";
import { Button } from "@mantine/core";

export default function CoursePreview() {
    return (
        <div className="bg-[#F6F5F4] w-4/5 flex flex-row">
            <div>
                <h1 className="text-4xl font-semibold">
                    Blockchain Applications{" "}
                </h1>
                <p>
                    Apply blockchain technology to real-world business
                    challenges as you learn from a top-10 ranked university in
                    the United States. Earn a powerful university-issued career
                    credential in as little as three months. ...
                </p>
                <div className="flex flex-row">
                    <h2>Instructor : xxxxxxxx</h2>
                    <Button radius="lg" size="lg">
                        Enroll Now
                    </Button>
                </div>
            </div>
            <YoutubeVideo />
        </div>
    );
}
