import CourseVideoPreview from "../../components/courseVideo/CourseVideoPreview";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { client } from "../../common/axios/axios";
import CourseVideoTitle from "../../components/courseVideo/CourseVideoTitle";
import YoutubeVideo from "../../components/common/YoutubeVideo";

interface Video {
    id: number;
    name: string;
    video_url: string;
}

const videoPage = () => {
    const router = useRouter();
    const { videopage } = router?.query;
    const [datat, setDatat] = useState([
        {
            name: "bruce",
            id: 1,
            video_url: "https://www.youtube.com/watch?v=1Q8fG0TtVAY",
        },
    ]);
    async function getProps() {
        try {
            const res = await client.get(`/course/getCourseVideo/${videopage}`);
            const { totalVideo, courseVideo } = res.data;
            setDatat(courseVideo);
        } catch (e) {
            console.log("error");
        }
    }

    useEffect(() => {
        if (!router.isReady) return;
        getProps();
    }, [router.isReady]);
    const [activeVideo, setActiveVideo] = useState(0);
    const videoList = datat.map((data: any, index) => {
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
        <>
            <NavBar />
            <div className="flex flex-col">
                <div className="flex flex-row justify-center w-full p-5">
                    <YoutubeVideo
                        video_url={datat[activeVideo].video_url}
                        width="854"
                        height="480"
                    />
                    <div className="m-5 bg-[#F6F5F4] w-1/3">{videoList}</div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default videoPage;
