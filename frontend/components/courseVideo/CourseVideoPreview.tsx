import { useState } from "react";
import YoutubeVideo from "../common/YoutubeVideo";
import CourseVideoList from "./CourseVideoList";

export default function CourseVideoPreview() {
    const [video, setVideo] = useState();
    return (
        <div>
            <YoutubeVideo video_url={video} />
            <div>
                <CourseVideoList />
            </div>
        </div>
    );
}
