import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {updatedIPLData: [], loader: true}

  componentDidMount() {
    this.getBlogData()
  }

  getBackgroundColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  getFormattedData = data => ({
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    date: data.date,
    firstInnings: data.first_innings,
    id: data.id,
    manOFTheMatch: data.man_of_the_match,
    matchStatus: data.match_status,
    result: data.result,
    secondInnings: data.second_innings,
    umpires: data.umpires,
    venue: data.venue,
  })

  getBlogData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const dataFetched = await response.json()
    console.log(dataFetched)
    const formattedData = {
      latestMatchDetails: this.getFormattedData(
        dataFetched.latest_match_details,
      ),
      recentMatches: dataFetched.recent_matches.map(eachArray =>
        this.getFormattedData(eachArray),
      ),
      teamBannerUrl: dataFetched.team_banner_url,
    }
    this.setState({updatedIPLData: formattedData, loader: false})
  }

  render() {
    const {updatedIPLData, loader} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = updatedIPLData
    console.log(latestMatchDetails)
    const backgroundColor = this.getBackgroundColor()

    return (
      <div className={`cardContainer ${backgroundColor}`}>
        {loader ? (
          <div className="loader" testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <div className="banner-container">
              <img
                className="teamBanner"
                alt="team banner"
                src={teamBannerUrl}
              />
            </div>
            <LatestMatch latestMatch={latestMatchDetails} />
            <ul className="recent-matches-list">
              {recentMatches.map(eachMatchArray => (
                <MatchCard
                  key={eachMatchArray.id}
                  recentMatchArray={eachMatchArray}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
