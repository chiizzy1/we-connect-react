    import styles from "../style";
    import { Link } from "react-router-dom";
    import { robot } from "../assets";


    const Hero = () => (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div className={`flex-1 ${styles.flexStart} flex-col  text-white xl:px-0 sm:px-16 px-6`}>
            <div className="l">
                <div>
                    <h1 className="font-poppins text-gradient font-semibold ss:text-[68px] text-[52px] ss:leading-[100.8px] leading-[75px] w-full">9ja Connect!</h1>
                    <Link to={`/login`}>Login</Link>
                    <Link to={`/signup`}>Sign Up</Link>
                </div>

                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                    Our team of experts uses a methodology to identify the credit cards
                    most likely to fit your needs. We examine annual percentage rates,
                    annual fees.
                </p>
            </div>
        </div>

        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
                <img src={robot} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />
        </div>
    </section>
)

export default Hero