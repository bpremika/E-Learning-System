import styles from "../../styles/card.module.css";

interface Students {
    elememts: Array<string>;
}

export default function StudentsList(props: Students) {
    console.log(props.elememts);

    return (
        <>
            <div className={styles.table1_1}>
                <div className={styles.table1_2}>
                    <div className="text-2xs font-bold font-['Montserrat']">
                        {`students(${props.elememts.length})`}
                    </div>
                </div>

                <div
                    className={`bg-[#efefef] h-[495px] items-center flex flex-col mt-0`}
                >
                    {props.elememts.map((student) => (
                        <div key={student}>{student}</div>
                    ))}
                </div>
            </div>
        </>
    );
}
