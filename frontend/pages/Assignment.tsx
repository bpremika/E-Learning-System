import AssignmentList from "../components/common/AssignmentList";
import NavBar from "../components/NavBar";

interface Props {
    courseID: number;
}
export default function Assignment(prop: Props) {
    return (
        <>
            <NavBar />
            <h1
                className="text-xl font-bold font-['Montserrat']"
                style={{ marginBottom: 30 }}
            >Assignment</h1>
            <AssignmentList courseid={prop.courseID} />
        </>
    );
}
