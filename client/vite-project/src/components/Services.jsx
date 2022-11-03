import styles,{ layout } from "../style";
import { AiOutlineUser } from "react-icons/ai";


const Services = () => (
    <section id="services" className={`${styles.paddingY} ${styles.flexCenter} feedback-container flex flex-wrap sm:justify-start justify-center w-full`}>
        <div className="text-white feedback-card flex justify-between flex-col px-10 py-12 rounded-[20px]  max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5">
            <AiOutlineUser />
            <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10">No matter where you are, you're never alone</p>
        </div>
        <div className="text-white feedback-card flex justify-between flex-col px-10 py-12 rounded-[20px]  max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5">
            <AiOutlineUser />
            <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10">No matter where you are, you're never alone</p>
        </div>
        <div className="text-white feedback-card flex justify-between flex-col px-10 py-12 rounded-[20px]  max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5">
            <AiOutlineUser />
            <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10">No matter where you are, you're never alone</p>
        </div>
    </section>
)

export default Services