import styles from "../../styles/card.module.css";

interface Element {
    name: string;
    // edit: boolean
}

interface Elements {
    elememts: Array<Element>;
}

export default function StudentsList(props: Elements) {
    return (
        <>
            <div className={styles.table1_1}>
                <div className={styles.table1_2}>
                    {`students(${props.elememts.length})`}
                </div>

                <div className={styles.table1_3}></div>
            </div>
        </>
    );
}
