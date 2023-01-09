import styles from '../../styles/card.module.css'


interface Props{
    title: string;
    amount: number;
}

export default function DashboardTotalCard(data: Props) {
    
    return (
        <>
        <div className={styles.card1}>
            <div className={styles.text1_1}>
                {data.title}
            </div>
            <div className={styles.text1_2}>
                {data.amount}
            </div>
        </div>
        </>
    )
}