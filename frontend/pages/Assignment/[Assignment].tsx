import AssignmentList from "../../components/common/AssignmentList";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Assignment() {
    const router = useRouter();
    const [r, setR] = useState(false);
    const { Assignment } = router?.query;
    const [id, setId] = useState<string | string[] | undefined>();
    console.log(Assignment);
    useEffect(() => {
        if (!router.isReady) return;
        setId(Assignment);

        console.log(Assignment);
        setR(true);
    }, [router.isReady]);

    return (
        <>
            <NavBar />
            <h1
                className="text-xl font-bold font-['Montserrat']"
                style={{ marginBottom: 30 }}
            >
                Assignment
            </h1>
            {r && Assignment != undefined && <AssignmentList courseid={id} />}
        </>
    );
}
