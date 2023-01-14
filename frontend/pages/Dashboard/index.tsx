import DashboardTotalCard from "../../components/common/DashboardTotalCard";
import DashboardCourseCard from "../../components/common/DashboardCourseCard";
import NavBar from "../../components/NavBar";
import { createStyles, Chip, NativeSelect } from "@mantine/core";
import { useEffect, useState } from "react";
import { client } from "../../common/axios/axios";
import { countReset } from "console";
import CreateCourse from "../../components/dashboard/CreateCourse";

const useStyles = createStyles((theme, _params, getRef) => ({
    label: {
        "&[data-checked]": {
            "&, &:hover": {
                backgroundColor: theme.colors.blue[theme.fn.primaryShade()],
                color: theme.white,
            },

            [`& .${getRef("iconWrapper")}`]: {
                color: theme.white,
            },
        },
    },

    iconWrapper: {
        ref: getRef("iconWrapper"),
    },
}));

interface Subject {
    title: string;
    studentsAmount: number;
    allStudents: number;
    image: string;
}
interface DashboardProp {
    teacher: string;
    totalCoursesAmount: number;
    totalStudentsAmount: number;
    ActiveSubjects: Array<Subject>;
    InactiveSubjects: Array<Subject>;
    CompletedSubjects: Array<Subject>;
}

interface CourseDTO {
    name: string;
    course_cover_url: string;
    curr_student: number;
    max_student: number;
}
interface DashboardDTO {
    courses: Array<CourseDTO>;
    total_all_student: number;
    total_course: number;
}

export default function Dashboard(props: DashboardProp) {
    async function getData() {
        const res = await client.get("/course/instructorDashboard/1");
        console.log(res.data);
        setData(res.data);
    }

    const [data, setData] = useState<DashboardDTO | null>(null);
    useEffect(() => {
        getData();
    }, []);

    const { classes } = useStyles();

    const [subjectShow, setSubjectShow] = useState(props.ActiveSubjects);
    const [subjectState, setSubjectState] = useState("Active");
    useEffect(() => {
        if (subjectState == "Active") {
            setSubjectShow(props.ActiveSubjects);
        } else if (subjectState == "Inactive") {
            setSubjectShow(props.InactiveSubjects);
        } else if (subjectState == "completed") {
            setSubjectShow(props.CompletedSubjects);
        }
        console.log(`Subjects state: ${subjectState}`);
        console.log(subjectShow);
    }, [subjectState]);

    const [coursePerformance, setCoursePerformance] = useState("");
    useEffect(() => {
        console.log(`Course performance: ${coursePerformance}`);
    });

    return (
        <>
            <NavBar />
            <div style={{ margin: 30, marginLeft: 50, marginRight: 80 }}>
                <h1 className="text-2xl font-bold font-['Montserrat']">
                    {`Aj.${props.teacher} Dashboard`}
                </h1>

                <div style={{ display: "flex" }}>
                    <DashboardTotalCard
                        title="total courses"
                        amount={data?.total_course ?? 0}
                    ></DashboardTotalCard>

                    <DashboardTotalCard
                        title="total students"
                        amount={data?.total_all_student ?? 0}
                    ></DashboardTotalCard>
                </div>

                <h1
                    style={{ marginTop: 30 }}
                    className="text-2xl font-bold font-['Montserrat']"
                >
                    Courses
                </h1>

                {/* <div style={{display: 'flex', marginTop: 20}}>
                    <Chip.Group position="center">
                        <Chip classNames={classes} value="Active"
                        onClick={() => setSubjectState('Active')}>
                            <div className="text-2xs font-bold font-['Montserrat']">Active</div>
                        </Chip>
                        <Chip classNames={classes} value="Inactive"
                        onClick={() => setSubjectState('Inactive')}>
                            <div className="text-2xs font-bold font-['Montserrat']">Inctive</div>
                        </Chip>
                        <Chip classNames={classes} value="Completed"
                        onClick={() => setSubjectState('Completed')}>
                            <div className="text-2xs font-bold font-['Montserrat']">Completed</div>
                        </Chip>
                        
                        <Chip classNames={classes} value='Active'
                        onClick={() => setSubjectState('Active')}>Active</Chip>
                        <Chip classNames={classes} value='Inactive'
                        onClick={() => setSubjectState('Inactive')}>Inactive</Chip>
                        <Chip classNames={classes} value='Completed'
                        onClick={() => setSubjectState('Completed')}>Completed</Chip>

                    </Chip.Group>
                </div > */}

                {/* <div style={{marginTop: 10}} className="text-2xs font-bold font-['Montserrat']">
                    {`showing ${subjectShow.length}/${props.ActiveSubjects.length+
                    props.InactiveSubjects.length+props.CompletedSubjects.length}`}
                    showing
                </div> */}

                <div
                    style={{
                        display: "flex",
                        marginTop: 10,
                        borderRadius: 20,
                        backgroundColor: "#F2F2F2",
                        height: 260,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            margin: 5,
                            overflowX: "hidden",
                            overflowY: "scroll",
                        }}
                    >
                        {data?.courses.map((course) => (
                            <DashboardCourseCard
                                subject={course.name ?? ""}
                                students={course.curr_student ?? 0}
                                allStudents={data?.total_all_student ?? 0}
                                key={course.name}
                            ></DashboardCourseCard>
                        ))}
                        {/* <DashboardCourseCard
                        subject="cal"
                        students={10}
                        allStudents={data?.total_all_student ??0}></DashboardCourseCard> */}
                    </div>
                </div>

                {/* <h1 style={{marginTop: 30}} className="text-2xl font-bold font-['Montserrat']">
                    Courses Performance
                </h1>

                <div style={{display: 'flex', marginTop: 10}}>
                    <NativeSelect
                    // data={['Select course'].concat(subjectShow.map((subject)=> {
                    //     return (
                    //         subject.title
                    //     )
                    // }))}
                    data={['Select course'].concat(['Calculus 1', 'Calculus 2', 'GenPhy 1'])}
                    variant="filled"
                    radius="xl"
                    value={coursePerformance}
                    onChange={(event) => setCoursePerformance(event.currentTarget.value)}
                    />
                </div>

                <div style={{display: 'flex', marginTop: 20, borderRadius: 20, backgroundColor: '#F2F2F2', height: 500}}>

                </div> */}
            </div>
            <CreateCourse />
        </>
    );
}
