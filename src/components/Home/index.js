import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {iplData: [], loader: true}

  componentDidMount() {
    this.getIPLData()
  }

  getIPLData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchData = await response.json()
    const IPLData = fetchData.teams.map(eachArray => ({
      id: eachArray.id,
      name: eachArray.name,
      teamImageUrl: eachArray.team_image_url,
    }))
    this.setState({iplData: IPLData, loader: false})
  }

  render() {
    const {iplData, loader} = this.state

    return (
      <div className="bg-container">
        {loader ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <div className="ipl-dashboard-card-container">
              <img
                className="ipl-logo"
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
                alt="ipl logo"
              />
              <h1 className="dashboard-heading">IPL Dashboard</h1>
            </div>
            <ul className="card-container">
              {iplData.map(IPLArray => (
                <TeamCard key={IPLArray.id} IPLArray={IPLArray} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default Home
