import "./Layout.css";
import { LeftSide, Middle, NewPost, RightSide, PostAndComments } from '../components';
import styles from "../style";

const Comments = () => {
    return ( 
        <div className={`bg-appBG ${styles.paddingX} text-white sm:pt-2 pt-1  ${styles.flexCenter}`}>     
              <div className={`${styles.boxWidth} layout-grid `}>
                  <LeftSide />
                  <div className="flex flex-col gap-4 h-screen overflow-auto pb-8">
                        <NewPost />
                        <PostAndComments />
                  </div>
                  <RightSide />
              </div>       
        </div>
      )
}

export default Comments