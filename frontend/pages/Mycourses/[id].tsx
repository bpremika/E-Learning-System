import { useRouter } from "next/router";

const StudentCourses = () => {
    const router = useRouter();
    const { id } = router.query;

    return <div>Hello StudentCourses{id}</div>;
};
export default StudentCourses;
