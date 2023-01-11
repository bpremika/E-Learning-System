import YoutubeVideo from "./YoutubeVideo";
import { Button } from "@mantine/core";

interface Props {
    name?: string;
    course_desc?: string;
    instructor_name?: string;
    video_url?: string;
}
export default function CoursePreview(prop: Props) {
    return (
        <div className="bg-[#F6F5F4] w-full flex flex-row p-5">
            <div className="flex flex-col gap-4 m-5">
                <h1 className="text-4xl font-bold font-['Montserrat']">
                    Blockchain Applications{" "}
                </h1>
                <p className="font-['Montserrat']">
                    Apply blockchain technology to real-world business
                    challenges as you learn from a top-10 ranked university in
                    the United States. Earn a powerful university-issued career
                    credential in as little as three months. ...
                </p>
                <div className="flex flex-row gap-8">
                    <h2 className="font-semibold font-['Montserrat']">
                        Instructor : xxxxxxxx
                    </h2>
                    <Button radius="lg" size="xl" color="GlobalTalk-Cyan-Dark">
                        Enroll Now
                    </Button>
                </div>
            </div>
            <YoutubeVideo
                video_url="https://www.youtube.com/embed/lVLz_ASqAio"
                width="426"
                height="240"
            />
        </div>
    );
}
