const feedCard = ({text, image, likes, id}) => (
    <div className="flex flex-col" key={id}>
        
        <img src={image} alt="feed-pic" />
        <p className="text-white">{text}</p>
        <h1 className="text-orange-700">{id}</h1>
        <p className="text-orange-700">{likes}</p>
    </div>
)

export default feedCard