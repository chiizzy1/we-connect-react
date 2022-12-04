import { TrendData } from "../constants";


const TrendCard = () => {
  return (
    <div className="flex flex-col gap-4 p-2 rounded-2xl bg-gray-500">
        <h3>Trends for you</h3>

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