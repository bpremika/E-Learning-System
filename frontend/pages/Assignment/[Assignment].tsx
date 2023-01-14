import AssignmentList from "../../components/common/AssignmentList";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/router";

export default function Assignment() {
    const router = useRouter();
    const { Assignment } = router.query;
    console.log(Assignment);
    return (
        <>
            <NavBar />
            <h1
                className="text-xl font-bold font-['Montserrat']"
                style={{ marginBottom: 30 }}
            >
                Assignment
            </h1>

            <AssignmentList courseid={Assignment} />
        </>
    );
}
