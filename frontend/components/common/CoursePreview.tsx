import YoutubeVideo from "./YoutubeVideo";
import { Button } from "@mantine/core";
import Router, { useRouter } from "next/router";
interface Props {
    id: number;
    name?: string;
    course_desc?: string;
    instructor_name?: string;
    video_url: string;
}
export default function CoursePreview(prop: Props) {
    function enroll() {
        Router.push(`/Mycourses/${prop.id}`);
    }
    return (
        <div className="bg-[#F6F5F4] w-full flex flex-row p-5">
            <div className="flex flex-col gap-4 m-5">
                <h1 className="text-4xl font-bold font-['Montserrat']">
                    {prop.name}
                </h1>
                <p className="font-['Montserrat']">{prop.course_desc}</p>
                <div className="flex flex-row gap-8">
                    <h2 className="font-semibold font-['Montserrat']">
                        Instructor : {prop.instructor_name}
                    </h2>
                    <Button
                        radius="lg"
                        size="xl"
                        color="GlobalTalk-Cyan-Dark"
                        onClick={enroll}
                    >
                        Enroll Now
                    </Button>
                </div>
            </div>
            <YoutubeVideo video_url={prop.video_url} width="426" height="240" />
        </div>
    );
}
