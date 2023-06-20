import { useFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { startUserUpdate } from '../../reduxStore/action/User'

const UserForm = (props) => {
    const dispatch = useDispatch()
    const { handleCancel, useHistory, user } = props
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            username:user.username,
            email:user.email,
            mobile:user.mobile,
            occupation:user.occupation,
        },
        validationSchema:Yup.object({
            username:Yup.string().required(),
            email:Yup.string().required(),
            mobile:Yup.number().required(),
            occupation:Yup.string(),
        }),
        onSubmit:function(values){
            const redirect = () => {
                history.go(0)
            }
            dispatch(startUserUpdate(user._id, values, redirect))
        }
    })

    return (
        <div>
            
            <form onSubmit={formik.handleSubmit} className="form">
                <h2>Edit Profile</h2>
                <label>name:</label><br/>
                <input
                    type="text"
                    value={formik.values.username}
                    name="username"
                    onChange={formik.handleChange}

                />
                {formik.touched.username && formik.errors.username && <span>{ formik.errors.username }</span>}

                <br/>
                <label>email:</label><br/>
                <input
                    type="email"
                    value={formik.values.email}
                    name="email"
                    onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && <span>{ formik.errors.email }</span>}

                
                <br/>
                <label>mobile:</label><br/>
                <input
                    type="number"
                    value={formik.values.mobile}
                    name="mobile"
                    onChange={formik.handleChange}
                />
                
                {formik.touched.mobile && formik.errors.mobile && <span>{ formik.errors.mobile }</span>}

                
                <br/>
                
                <label>occupation:</label><br/>
                <input
                    type="text"
                    value={formik.values.occupation}
                    name="occupation"
                    onChange={formik.handleChange}
                />
                
                {formik.touched.occupation && formik.errors.occupation && <span>{ formik.errors.occupation }</span>}
                
                <br/>

                <input type="submit" value="submit" className='submit'/>
                <button onClick={handleCancel}>cancel</button>
                
            </form>         
        </div>
    )
}

export default UserForm