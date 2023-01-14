import { client } from "../../common/axios/axios";
import { CourseResultDTO, CourseInfo } from "../../common/dto/course";
import SearchBar from "../../components/common/SearchBar";
import NavBar from "../../components/NavBar";
import CourseCard from "../../components/common/CourseCard";
import { useEffect, useState } from "react";
import { Chip } from "@mantine/core";
import { AxiosResponse } from "axios";
import MyCourseCard from "../../components/common/MyCourseCard";

const MyCourses = () => {
    const [courses, setCourses] = useState<CourseInfo[]>([]);
    const [value, setValue] = useState("all");
    async function getCourses() {
        try {
            let res: AxiosResponse;
            res = await client.get("/course/getMyCourse");
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
    }, []);
    return (
        <>
            <NavBar />
            <div className="my-[50px] flex flex-col items-center">
                <div className="flex flex-col md:flex-row justify-around w-[100vw] m-[30px] items-center">
                    <div className="font-bold text-[30px] font-['Montserrat'] ">
                        Online Courses
                    </div>
                    <SearchBar />
                </div>
                <div className="flex flex-row flex-wrap w-[80vw] justify-center ">
                    {courses.map((d) => {
                        return (
                            <MyCourseCard
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
export default MyCourses;
