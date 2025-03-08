
import TopBox from '../../components/topBox/TopBox'
import "./metrics.scss"
import MapsDisplay from '../../components/maps/maps'
const Metrics = () => {
  return (
     <div className='metrics'>
          <div className="box box1">{<MapsDisplay />}</div>
          <div className="box box4"><TopBox /></div>

     </div>
  )
}

export default Metrics