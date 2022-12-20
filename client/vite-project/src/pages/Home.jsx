import "./Layout.css";
import { LeftSide, Middle, RightSide } from '../components';
import styles from "../style";


const Home = () => {
  return ( 
    <div className={`bg-appBG ${styles.paddingX} sm:pt-2 pt-1  ${styles.flexCenter}`}>     
          <div className={`${styles.boxWidth} layout-grid `}>
              <LeftSide />
              <Middle />
              <RightSide />
          </div>       
    </div>
  )
}

export default Home