const Card = ({ text, imageSrc, alt }) => {
    return <div className="card-container">
        <div className="card">
            <div className="top">
                <div className="img" style={{ backgroundImage: imageSrc ? `url(${imageSrc})` : 'none' }} alt={alt || ''}></div>
            </div>
            <div className="bottom">
                <span className="text">{text}</span>
            </div>
        </div>
    </div>
} 
