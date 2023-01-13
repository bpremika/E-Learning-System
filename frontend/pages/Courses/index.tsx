import { client } from "../../common/axios/axios";
import { CourseResultDTO, CourseInfo } from "../../common/dto/course";
import SearchBar from "../../components/common/SearchBar";
import NavBar from "../../components/NavBar";
import CourseCard from "../../components/common/CourseCard";
import { useEffect, useState } from "react";
import { Chip } from "@mantine/core";
import { AxiosResponse } from "axios";
// interface props {
//     course: CourseResultDTO;
// }
const Courses = () => {
    const [courses, setCourses] = useState<CourseInfo[]>([]);
    const [value, setValue] = useState("all");
    async function getCourses() {
        try {
            let res: AxiosResponse;
            if (value === "all") {
                res = await client.get("/course/home/1");
                console.log(res.data);
            } else {
                res = await client.get(`/course/category/${value}/1`);
                console.log(res.data);
            }
            const newcourse = res.data as CourseResultDTO;
            const newcoursewI = newcourse.courses.map((course) => {
                if (course.course_cover_url.startsWith("http")) {
                    return course;
                }
                return {
                    ...course,
                    course_cover_url:
                        "https://hacktoschool.sgp1.cdn.digitaloceanspaces.com/" +
                        course.course_cover_url,
                };
            });
            setCourses(newcoursewI);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getCourses();
    }, [value]);
    return (
        <>
            <NavBar />
            <div className="my-[50px] flex flex-col items-center">
                <div className="flex flex-row justify-around w-[100vw] m-[30px] items-center">
                    <div className="font-bold text-[30px] font-['Montserrat'] ">
                        Online Courses
                        <Chip.Group
                            position="center"
                            multiple={false}
                            value={value}
                            onChange={setValue}
                        >
                            <Chip value="all">All</Chip>
                            <Chip value="Programming_Language">
                                Programming
                            </Chip>
                            <Chip value="Business">Business</Chip>
                            <Chip value="English">Eng</Chip>
                        </Chip.Group>
                    </div>
                    <SearchBar />
                </div>
                <div className="flex flex-row flex-wrap w-[80vw] justify-center ">
                    {courses.map((d) => {
                        return (
                            <CourseCard
                                key={d.id}
                                id={d.id}
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

// export async function getStaticProps() {
//     const res = await client.get("/course/getMany/1");
//     const course = res.data as CourseResultDTO;
//     console.log(course)
//     return {
//         props: {
//             course: {
//                 total: course.total,
//                 courses: course.courses.map((v) => {
//                     if (v.course_cover_url.startsWith("http")) {
//                         return v;
//                     }
//                     return {
//                         ...v,
//                         course_cover_url: "https://via.placeholder.com/500x300",
//                     };
//                 }),
//             },
//         }, // will be passed to the page component as props
//     };
// }
