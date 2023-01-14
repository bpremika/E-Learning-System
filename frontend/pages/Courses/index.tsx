import { client } from "../../common/axios/axios";
import { CourseResultDTO, CourseInfo } from "../../common/dto/course";
import SearchBar from "../../components/common/SearchBar";
import NavBar from "../../components/NavBar";
import CourseCard from "../../components/common/CourseCard";
import { useEffect, useState } from "react";
import { Chip, FocusTrap, Pagination, Input } from "@mantine/core";
import { AxiosResponse } from "axios";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import Footer from "../../components/Footer";

// interface props {
//     course: CourseResultDTO;
// }
const Courses = () => {
    const [search, setSearch] = useState("");
    const [debounced] = useDebouncedValue(search, 200, { leading: true });
    const [courses, setCourses] = useState<CourseInfo[]>([]);
    const [value, setValue] = useState("all");

    const [activePage, setPage] = useState(1);

    async function getCourses() {
        try {
            let res: AxiosResponse;
            if (value === "all") {
                res = await client.get(`/course/home/${activePage}`);
                console.log(res.data);
            } else {
                res = await client.get(
                    `/course/category/${value}/${activePage}`
                );
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
        getCourseSearch(debounced);
    }, [debounced]);

    async function getCourseSearch(e: string) {
        try {
            if (e === "") {
                setValue("all");
            } else {
                let res: AxiosResponse;
                const newe = e.replace(" ", "+");
                res = await client.get(
                    `/course/home/${activePage}?search=${newe}`
                );

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
            }
        } catch (e) {
            console.log(e);
        }

        return console.log(e);
    }
    useEffect(() => {
        getCourses();
    }, [value, activePage]);
    return (
        <>
            <NavBar />
            <div className="my-[50px] flex flex-col items-center h-[100%] min-h-screen">
                <div className="flex gap-4 md:gap-0 flex-col md:flex-row md:justify-around w-[100vw] m-[30px] items-center">
                    <div className="font-bold text-[30px] font-['Montserrat'] text-center md:text-start">
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
                    <Input
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        }
                        placeholder="Search..."
                        onChange={(event: any) => {
                            setSearch(event.currentTarget.value);
                        }}
                        value={search}
                    />
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
                <div className="fixed bottom-10 bg-greyry p-[10px] rounded-2xl">
                    <Pagination
                        page={activePage}
                        onChange={setPage}
                        total={10}
                        size="lg"
                        radius="lg"
                    />
                </div>
            </div>
            <Footer />
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
