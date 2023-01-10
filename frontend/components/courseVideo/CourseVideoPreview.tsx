import { useState } from "react";
import YoutubeVideo from "../common/YoutubeVideo";
import CourseVideoTitle from "./CourseVideoTitle";

export default function CourseVideoPreview() {
    const [video, setVideo] = useState();
    return (
        <div className="flex flex-col">
            <div className="flex flex-row w-4/5">
                <YoutubeVideo video_url={video} />
                <div className="m-5 bg-[#F6F5F4]">
                    <CourseVideoTitle/>
                    <CourseVideoTitle/>
                    <CourseVideoTitle/>
                </div>
            </div>
        </div>
        
    );
}
