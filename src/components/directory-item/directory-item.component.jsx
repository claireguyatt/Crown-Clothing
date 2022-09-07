import './directory-item.styles.scss';

// react hook
import { useNavigate, Link } from 'react-router-dom';

const DirectoryItem = ({ category }) => {

    const { imageUrl, title, route } = category;

    return (

        <div className="directory-item-container">
        <div 
          className='background-image' 
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className='body'>
          <h2>{title}</h2>
          <Link to={route}>Shop Now</Link>
        </div>
      </div>
    )
}

export default DirectoryItem;