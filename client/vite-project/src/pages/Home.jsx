import "./Layout.css";
import { LeftSide, Middle, RightSide } from '../components'

const Home = () => {
  return (
    <div className='layout-grid'>
        <LeftSide />
        <Middle />
        <RightSide />
    </div>
  )
}

export default Home