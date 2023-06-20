import background from '../assets/background.png'

const DashBoard = (props) => {
    return (
        <div className="dashboard">
            <p 
            >Manage all your expenses at one place...</p>
            <img 
                src={background}
                alt="background"
            />
        </div>
    )
}

export default DashBoard;