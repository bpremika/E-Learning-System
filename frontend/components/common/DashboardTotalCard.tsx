import styles from "../../styles/card.module.css";

interface Data {
    title: string;
    amount: number;
}

export default function DashboardTotalCard(props: Data) {
    return (
        <div className="text-2xl font-bold font-['Montserrat']">
            <div className={styles.card1}>
                <div className={styles.text1_1}>{props.title}</div>
                <div className={styles.text1_2}>{props.amount}</div>
            </div>
        </div>
    );
}
