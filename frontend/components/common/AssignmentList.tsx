import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { client } from "../../common/axios/axios";
import AssignmentDetail from "../modals/AssignmentDetail";

interface DashboardDetailProps {
    students_in_course: Array<StudentDTO>;
    videos_in_course: Array<VideoDTO>;
    assignments_in_course: Array<AssignmentsDTO>;
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

interface AssignmentsDTO {
    id: number;
    name: string;
    description: string;
    aj_file_url: string;
    max_score: number;
}

interface Props {
    courseid: string | string[] | undefined;
}

const AssignmentList = ({ courseid }: Props) => {
    async function getData() {
        try {
            const res = await client.get(
                `/course/instructorDetailedDashboard2/${courseid}`
            );
            console.log(res.data);
            setData(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    const [data, setData] = useState<DashboardDetailProps | null>(null);
    useEffect(() => {
        getData();
    }, []);

    const elements = data?.assignments_in_course.map((row) => {
        return {
            id: row.id,
            name: row.name,
            aj_file_url: row.aj_file_url,
            description: row.description,
        };
    }) ?? [
        {
            id: 0,
            name: "",
            aj_file_url: "",
            description: "",
        },
    ];

    const rows = elements.map((element) => (
        <tr key={element.id}>
            <td>{element.name}</td>
            <td>
                <AssignmentDetail
                    assignmentID={element.id}
                    name={element.name}
                    description={element.description}
                    file_url={element.aj_file_url}
                />
            </td>
        </tr>
    ));

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
};

export default AssignmentList;
