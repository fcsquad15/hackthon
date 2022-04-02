import Profile_icon from '../../images/profile-icon-png-898.png'
import './styles.css'

function Card({ id, avatar, name }) {
    return (
        <div className='profile-card'>
            <img className='profile-icon' src={avatar === '' ? Profile_icon : avatar} alt={`profile ${name}`} />
            <h1 className='profile-name' >{name}</h1>
        </div>
    )
}

export default Card