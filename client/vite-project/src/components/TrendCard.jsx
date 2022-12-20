import { TrendData } from "../constants";
import styles from "../style";


const TrendCard = () => {
  return (
    <div className={`flex flex-col gap-4 p-4 rounded font-poppins ${styles.glassM}`}>
        <h3 className={`${styles.h3Style}`}>Trends for you</h3>

        {TrendData.map((data, index) => (
            <div className="flex flex-col gap-2" key={index}>
                <span className="font-semibold"># {data.name}</span>
                <span className="text-xs">{data.shares} shares</span>
            </div>
        ))}
    </div>
  )
}

export default TrendCard