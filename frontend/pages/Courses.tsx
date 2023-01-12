import { client } from "../common/axios/axios";
import { CourseResultDTO } from "../common/dto/course";
import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/NavBar";

interface props {
    course: CourseResultDTO;
}
const Courses = ({ course }: props) => {
    return (
        <>
            <NavBar />
            <div className="my-[50px]">
                <div className="flex flex-row justify-around">
                    <div className="font-bold text-[30px] font-['Montserrat'] ">
                        Online Courses
                    </div>
                    <SearchBar />
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
            course: course,
        }, // will be passed to the page component as props
    };
}
