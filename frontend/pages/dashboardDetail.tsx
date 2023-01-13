import { useEffect, useState } from "react";
import { client } from "../common/axios/axios";
import { useUser } from "../common/contexts/UserContext";
import StudentsList from "../components/common/StudentsList";
import VideoTable from "../components/common/VideoTable";
import AssignmentTable from "../components/dashboard/AssignmentTable";
import NavBar from "../components/NavBar";

interface DashboardDetailProps{
    students_in_course: Array<Student>;
    videos_in_course: Array<Video>;
    assignments_in_course: Array<Assignment>;
    course_desc: string;
    course_detail: string;
}

interface Student{
    username: string;
}

interface Video{
    id: number;
    name: string;
    video_url: string;
}

interface Assignment{
    id: number;
    name: string;
    description: string;
    aj_file_url: string;
    max_score: number;
}


interface DashboardDetailPropsDTO{
    students_in_course: Array<StudentDTO>;
    videos_in_course: Array<VideoDTO>;
    assignments_in_course: Array<AssignmentDTO>;
    course_desc: string;
    course_detail: string;
}

interface StudentDTO{
    username: string;
}

interface VideoDTO{
    id: number;
    name: string;
    video_url: string;
}

interface AssignmentDTO{
    id: number;
    name: string;
    description: string;
    aj_file_url: string;
    max_score: number;
}

export default function DashboardDetail() {
    
    async function getData() {
        try {
            const res = await client.get("/course/instructorDetailDashboard/1")
            console.log(res.data);
            setData(res.data);
        } catch (e) {
            console.log('Error')
        }
    }



    const [data, setData] = useState<DashboardDetailProps | null>(null);
    useEffect(()=> {
        getData();
    }, []);
    
    const {user} = useUser();
    
    return (
        <>
        <NavBar />
            <div style={{display: 'flex', flexFlow: 'column', margin: 30, marginLeft: 50, marginRight: 80}}>
                <div style={{display: 'flex'}}>
                    <h1 className="text-2xl font-bold font-['Montserrat']">
                        {`Aj.${user?.username} Dashboard`}
                    </h1>
                </div>

                <div style={{display: 'flex', flexFlow: 'row'}}>
                    <div style={{width: 230, height: 540, marginTop: 25}}>
                    <StudentsList
                    elememts={data?.students_in_course.map((student)=>{
                        return student.username
                        }) ??['']}/>
                    
                    </div>

                    <div style={{width: 750, marginLeft: 80, marginTop: 40}}>
                        <h1 className="text-xl font-bold font-['Montserrat']" style={{marginBottom: 30}}>
                            Course Description
                        </h1>
                        
                        <div style={{height: 165, marginBottom: 30, borderRadius: 20, backgroundColor: '#E5F5FB'}}>

                        </div>

                        <h1 className="text-xl font-bold font-['Montserrat']" style={{marginBottom: 30}}>
                            Course Video
                        </h1>

                        <div style={{height: 250, marginBottom: 30}}>
                            <VideoTable
                            elememts={data?.videos_in_course.map((video)=> {
                                return {id: video.id, name: video.name, videoURL: video.video_url, categoryVideo: '???'}}
                            ) ??[{id: 0, name: 'none', videoURL: 'none', categoryVideo: 'none'}] }/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}