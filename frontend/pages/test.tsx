import CourseCard from "../components/common/CourseCard";
import DashboardTotalCard from "../components/common/DashboardTotalCard";
import DashboardCourseCard from "../components/common/DashboardCourseCard";
import VideoTable from "../components/common/VideoTable";
import StudentList from "../components/common/StudentsList";

export default function TestComponent() {
    const videos = [
        {
            id: 1,
            categoryVideo: "asdad",
            name: "sadasdsfsd",
            videoUrl: "http://sfafdsa",
            edit: false,
        },
        {
            id: 2,
            categoryVideo: "asasdfsafsdasfadfsdafdafdad",
            name: "sadasdsfasdfasdfasdasd",
            videoUrl: "http://sdfaasdfasdfasdfasdfsafasdfdfasdfasfdasdfdaa",
            edit: false,
        },
        {
            id: 3,
            categoryVideo: "asdad",
            name: "sadasdsfsd",
            videoUrl: "http://sdfadfa",
            edit: false,
        },
        {
            id: 4,
            categoryVideo: "asdad",
            name: "sadasdsfsd",
            videoUrl: "http://sdfadfa",
            edit: false,
        },
        {
            id: 5,
            categoryVideo: "asdad",
            name: "sadasdsfsd",
            videoUrl: "http://sdfadfa",
            edit: false,
        },
    ];

    const students = [
        { name: "Jotaro" },
        { name: "Joseph" },
        { name: "Josuke" },
    ];

    return (
        <>
            {/* <CourseCard
        name=""
        imgurl=""
        description=""></CourseCard> */}

            {/* <VideoTable elememts={videos}></VideoTable> */}

            <StudentList elememts={students}></StudentList>
        </>
    );
}
