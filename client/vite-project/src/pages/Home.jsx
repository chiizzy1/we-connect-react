import "./Layout.css";
import { LeftSide, Middle, RightSide } from '../components';
import styles from "../style";


const Home = () => {
  return ( 
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth} layout-grid `}>
              <LeftSide />
              <Middle />
              <RightSide />
          </div>
    </div>
  )
}

export default Home