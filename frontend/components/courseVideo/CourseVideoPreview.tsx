import { useEffect, useState } from "react";
import YoutubeVideo from "../common/YoutubeVideo";
import CourseVideoTitle from "./CourseVideoTitle";
import { videoData } from "../../common/mock/video";
interface video {
    id: number;
    name: string;
    video_url: string;
}
interface CourseVideoPreviewProps {
    videoData: video[];
}
export default function CourseVideoPreview({
    videoData,
}: CourseVideoPreviewProps) {
    const [activeVideo, setActiveVideo] = useState(0);
    const videoList = videoData.map((data, index) => {
        return (
            <CourseVideoTitle
                key={data.id}
                activeVideo={activeVideo}
                index={index + 1}
                courseTitle={data.name}
                onClick={() => {
                    setActiveVideo(index);
                }}
            />
        );
    });
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center w-full p-5">
                <YoutubeVideo
                    video_url={videoData[activeVideo].video_url}
                    width="854"
                    height="480"
                />
                <div className="m-5 bg-[#F6F5F4] w-1/3">{videoList}</div>
            </div>
        </div>
    );
}
