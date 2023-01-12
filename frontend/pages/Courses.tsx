import { client } from "../common/axios/axios";
import { CourseResultDTO } from "../common/dto/course";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/NavBar";
import CourseCard from "../components/common/CourseCard";
interface props {
    course: CourseResultDTO;
}
const Courses = ({ course }: props) => {
    return (
        <>
            <NavBar />
            <div className="my-[50px] flex flex-col items-center">
                <div className="flex flex-row justify-around w-[100vw] m-[30px]">
                    <div className="font-bold text-[30px] font-['Montserrat'] ">
                        Online Courses
                    </div>
                    <SearchBar />
                </div>
                <div className="flex flex-row flex-wrap w-[80vw] items-center">
                    {course.courses.map((d) => {
                        return (
                            <CourseCard
                                imgurl={d.course_cover_url}
                                name={d.name}
                                description={d.course_desc}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};
export default Courses;

export async function getStaticProps() {
    const res = await client.get("/course/getMany/1");
    const course = res.data as CourseResultDTO;
    return {
        props: {
            course: {
                total: course.total,
                courses: course.courses.map((v) => {
                    if (v.course_cover_url.startsWith("http")) {
                        return v;
                    }
                    return {
                        ...v,
                        course_cover_url: "https://via.placeholder.com/500x300",
                    };
                }),
            },
        }, // will be passed to the page component as props
    };
}
