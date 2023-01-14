import CourseName from "../../components/CourseName";
import CoursePreview from "../../components/common/CoursePreview";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { client } from "../../common/axios/axios";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const CourseNamepage = () => {
    const [data, setData] = useState({
        course_desc:
            "nnovate with the Next Frontier in Technology. Learn how the blockchain is leading to a paradigm shift in decentralized application programming",
        first_name: "premika",
        guide_url: "https://www.youtube.com/embed/LBOkIsfLTB4",
        id: 2,
        last_name: "yu",
        name: "This course does not exist",
    });
    const router = useRouter();
    const { courseid } = router?.query;
    async function getProps() {
        try {
            const res = await client.get(`/course/enroll/${courseid}`);
            setData(res.data);
        } catch (e) {
            console.log("error");
        }
    }
    useEffect(() => {
        if (!router.isReady) return;
        getProps();
    }, [router.isReady]);
    return (
        <>
            <NavBar />
            <CoursePreview
                id={data.id}
                name={data.name}
                course_desc={data.course_desc}
                instructor_name={data.first_name + data.last_name}
                video_url={data.guide_url}
            />
            <Footer />
        </>
    );
};
export default CourseNamepage;
