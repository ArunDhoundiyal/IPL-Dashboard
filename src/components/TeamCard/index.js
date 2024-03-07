import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {IPLArray} = props
  const {id, name, teamImageUrl} = IPLArray
  return (
    <Link to={`/team-matches/${id}`}>
      <li className="team-card-container">
        <img className="team-logo" alt={name} src={teamImageUrl} />
        <div className="team-name-container">
          <p className="team-name">{name}</p>
        </div>
      </li>
    </Link>
  )
}

export default TeamCard
