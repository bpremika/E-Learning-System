import { useEffect, useState } from "react";
import { client } from "../../common/axios/axios";
import { useUser } from "../../common/contexts/UserContext";
import StudentsList from "../../components/common/StudentsList";
import VideoTable from "../../components/common/VideoTable";
import AssignmentTable from "../../components/dashboard/AssignmentTable";
import NavBar from "../../components/NavBar";
import { Textarea } from "@mantine/core";
import CourseMaterialUpload from "../../components/dashboard/CoureMaterialUpload";
import { useRouter } from "next/router";

interface DashboardDetailProps {
    students_in_course: Array<Student>;
    videos_in_course: Array<Video>;
    assignments_in_course: Array<Assignment>;
    course_desc: string;
    course_detail: string;
}

interface Student {
    username: string;
}

interface Video {
    id: number;
    name: string;
    video_url: string;
}

interface Assignment {
    id: number;
    name: string;
    description: string;
    aj_file_url: string;
    max_score: number;
}

interface DashboardDetailPropsDTO {
    students_in_course: Array<StudentDTO>;
    videos_in_course: Array<VideoDTO>;
    assignments_in_course: Array<AssignmentDTO>;
    course_desc: string;
    course_detail: string;
}

interface StudentDTO {
    username: string;
}

interface VideoDTO {
    id: number;
    name: string;
    video_url: string;
}

interface AssignmentDTO {
    id: number;
    name: string;
    description: string;
    aj_file_url: string;
    max_score: number;
}

export default function DashboardDetail() {
    const router = useRouter();
    const { user } = useUser();
    const { courseid } = router?.query;

    async function getData() {
        try {
            const res = await client.get(
                `/course/instructorDetailedDashboard/${courseid}`
            );
            console.log(res.data);
            setData(res.data);
        } catch (e) {
            console.log("Error");
        }
    }

    const [data, setData] = useState<DashboardDetailProps | null>(null);
    useEffect(() => {
        getData();
    }, []);

    const [value, setValue] = useState<string | undefined>(data?.course_desc);

    return (
        <>
            <NavBar />
            <div
                style={{
                    display: "flex",
                    flexFlow: "column",
                    margin: 30,
                    marginLeft: 50,
                    marginRight: 80,
                }}
            >
                <div style={{ display: "flex" }}>
                    <h1 className="text-2xl font-bold font-['Montserrat']">
                        {`Aj.${user?.username} Dashboard`}
                    </h1>
                    <h1
                        style={{ color: "#757575" }}
                        className="text-xl font-bold font-['Montserrat']"
                    ></h1>
                </div>

                <div style={{ display: "flex", flexFlow: "row" }}>
                    <div
                        style={{
                            width: 230,
                            height: 540,
                            marginTop: 35,
                            marginLeft: 30,
                        }}
                    >
                        <StudentsList
                            elememts={
                                data?.students_in_course.map((student) => {
                                    return student.username;
                                }) ?? [""]
                            }
                        />
                    </div>

                    <div style={{ width: 750, marginLeft: 120, marginTop: 40 }}>
                        <h1
                            className="text-xl font-bold font-['Montserrat']"
                            style={{ marginBottom: 30 }}
                        >
                            Course Description
                        </h1>

                        <div
                            style={{
                                height: 165,
                                marginBottom: 30,
                                borderRadius: 20,
                                backgroundColor: "#E5F5FB",
                            }}
                        >
                            <Textarea
                                style={{
                                    marginLeft: 27,
                                    marginRight: 27,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    overflow: "visible",
                                }}
                                variant="unstyled"
                                withAsterisk
                                value={value}
                                onChange={(event) =>
                                    setValue(event.currentTarget.value)
                                }
                                defaultValue={data?.course_desc}
                            />
                        </div>

                        <h1
                            className="text-xl font-bold font-['Montserrat']"
                            style={{ marginBottom: 30 }}
                        >
                            Course Video
                        </h1>

                        <div style={{ height: 250, marginBottom: 30 }}>
                            <VideoTable
                                elememts={
                                    data?.videos_in_course.map((video) => {
                                        return {
                                            id: video.id,
                                            name: video.name,
                                            videoUrl: video.video_url,
                                        };
                                    }) ?? [
                                        {
                                            id: 0,
                                            name: "none",
                                            videoUrl: "none",
                                        },
                                    ]
                                }
                            />
                        </div>
                    </div>
                </div>

                <h1
                    className="text-xl font-bold font-['Montserrat']"
                    style={{ marginBottom: 30 }}
                >
                    Assignment
                </h1>

                <AssignmentTable
                    element={
                        data?.assignments_in_course.map((row) => {
                            return {
                                id: row.id,
                                name: row.name,
                                aj_file_url: row.aj_file_url,
                                max_score: row.max_score,
                                description: row.description,
                            };
                        }) ?? [
                            {
                                id: 0,
                                name: "",
                                aj_file_url: "",
                                max_score: 0,
                                description: "",
                            },
                        ]
                    }
                />
                <h1
                    className="text-xl font-bold font-['Montserrat']"
                    style={{ marginBottom: 30 }}
                >
                    Upload Course Material
                </h1>
                <CourseMaterialUpload courseID={1} />
            </div>
        </>
    );
}
