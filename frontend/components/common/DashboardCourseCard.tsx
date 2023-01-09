import styles from '../../styles/card.module.css'

interface Props{
    subject: string;
    students: number;
    allStudents: number;
}

export default function DashboardCourseCard(data: Props) {

    return (
        <>
        <div className={styles.card2}>
            <div className={styles.card2_1}>
            </div>
            
            <div className={styles.text2_1}>{data.subject}</div>
        </div>
        </>
    )
}