    import styles from "../style";
    import { students } from "../assets";
    import LinkButton from "./LinkButton";


    const Hero = () => (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingX} ${styles.paddingY}`}>
        <div className={`flex-1 ${styles.flexStart} flex-col  text-white`}>
                <h1 className="font-poppins text-gradient font-semibold ss:text-[68px] text-[52px] ss:leading-[100.8px] leading-[75px] w-full">9ja Connect!</h1>
            
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                    Our team of experts uses a methodology to identify the credit cards
                    most likely to fit your needs. We examine annual percentage rates,
                    annual fees.
                </p>

                <div className="flex mt-3">
                    <LinkButton link="/login" text="Login" style="mt-30" />
                    <LinkButton link="/signup" text="Sign Up" style="ml-8" />
                </div>
            
        </div>

        <div className={`object-contain md:object-scale-down overflow-hidden h-96 w-96 rounded-xl`}>
                <img src={students} alt="students" className="w-[100%] h-[100%]" />
        </div>
    </section>
)

export default Hero