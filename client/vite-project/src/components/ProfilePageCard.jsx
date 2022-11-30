const ProfilePageCard = ({id, image, text}) => (
    <div key={id}>
            <p>{text}</p>
            <p>{id}</p>
            <img src={image} alt='img'/>
    </div>
)
export default ProfilePageCard