import { useEffect, useState } from 'react'
import Login from './login'
import axios from 'axios'
import { Button, Modal } from 'antd';
import UserForm from './userForm'
import { useHistory } from 'react-router-dom'

const Profile = (props) => {

    const [ user, setUser ] =useState()
    const [ token, setToken ] = useState(false)
    const bearer = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: bearer
        }
    }
    useEffect(() => {
        const bearer = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: bearer
            }
        }
        //dispatch(startAccountUser())
        axios.get('http://localhost:3040/api/user/account', config)
             .then((res) => {
                //console.log(res.data)
                setUser(res.data)
                setToken(bearer)
             })
             .catch((err) => {
                alert(err.message)
             })
    },[])

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

        return (
            <div>
                <h1>Profile</h1>
                {
                    user? (
                        <div className="profile-info">
                            <article>
                                {user.image_url && <img src={user.image_url} alt="user photo" width="200" height="200"/>}
                                <h4>Username: {user.username}</h4>
                                <h4>Email: {user.email}</h4>
                                <h4>Phone: {user.mobile}</h4>
                                <p><b>Occupation:</b> {user.occupation ? user.occupation: "" } </p>
                            </article>
                            <>
                                <Button type="primary" onClick={showModal}>
                                    edit
                                </Button>
                                <Modal
                                    title=""
                                    open={open}
                                    confirmLoading={confirmLoading}
                                    onCancel={handleCancel}
                                    footer={null}
                                >
                                    <div>
                                        <UserForm 
                                            handleCancel={handleCancel}
                                            useHistory={useHistory}
                                            user={ user }
                                            config={ config}
                                        />
                                    </div>
                                </Modal>
                                
                                </>
                        </div>
                        ) : (
                            <div>
                                <h4>You need to be logged in</h4>
                                <Login />
                            </div>
                        )
                }
                
            </div>
        )
}

export default Profile;