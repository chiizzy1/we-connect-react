import "./Home.css";
import { LeftSide, Middle, RightSide } from '../components'

const Home = () => {
  return (
    <div className='home'>
        <LeftSide />
        <Middle />
        <RightSide />
    </div>
  )
}

export default Home