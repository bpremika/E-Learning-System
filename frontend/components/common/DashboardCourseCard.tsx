import styles from '../../styles/card.module.css'
import Image from 'next/image';
import mypic from "../../public/mdi_people-group.png";

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
                <div className={styles.text2_2}>
                    <Image className={styles.img2}
                        src={mypic}
                        alt="student icon"
                        width={18}
                        height={19}
                    />
                    {`${data.students}/${data.allStudents}`}
                </div>
            </div>
            
            <div className={styles.text2_1}>{data.subject}</div>
        </div>
        </>
    )
}