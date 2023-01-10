import styles from '../../styles/card.module.css'
import Image from 'next/image';

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
                    <image className={styles.img2}
                        src="https://www.figma.com/file/fnpeXt3oezve6NkQuNoqZU/My-simple-LMS?node-id=31%3A533&t=peNbETa8aGcrMVkh-4"
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