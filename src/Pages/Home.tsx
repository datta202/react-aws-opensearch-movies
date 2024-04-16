import coverImg from '../assets/cover.avif';
import { Link } from 'react-router-dom'

const Home = () => {
  return <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
    <Link to="projects">Go to Projects</Link>
    <h2>Website Under Construction</h2>
    <img src={coverImg} alt="" />
  </div>
}

export default Home