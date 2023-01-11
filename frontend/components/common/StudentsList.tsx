import styles from "../../styles/card.module.css";

interface Element{
    name: string;
    // edit: boolean
}

interface Props{
    elememts: Array<Element>

}

export default function StudentsList(data: Props) {


    return(
        <>
        <div className={styles.table1_1}>
            <div className={styles.table1_2}>
                {`students(${data.elememts.length})`}
            </div>
            
            <div className={styles.table1_3}>
                
            </div>
        </div>
        </>
    )
}