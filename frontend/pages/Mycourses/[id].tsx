import { useRouter } from "next/router";
import CoursesName from "../../components/CourseName";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
const StudentCourses = () => {
    return (
        <>
            <NavBar />
            <CoursesName />
        </>
    );
};
export default StudentCourses;
