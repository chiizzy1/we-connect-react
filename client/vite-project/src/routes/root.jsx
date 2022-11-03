import { Link } from "react-router-dom";
import styles from "../style";
import { Gallery, Hero, Services, Testimonials } from "../components";

const root = () => (
  <>
    <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
            <Hero />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Services />
          <Gallery />
          <Testimonials />
        </div>
      </div>
  </>
     
)

export default root