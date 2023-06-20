import { useFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { startLoginUser } from '../../reduxStore/action/User'
import { useState } from 'react'

const Login = (props) => {
    const [open, setOpen] = useState(false);
    const history = useHistory()
    const dispatch = useDispatch()
    const handleCancel = () => {
        setOpen(false);
    };
    const formik = useFormik({
        initialValues: {
            email:'',
            password:''
        },
        validationSchema:Yup.object({
            email:Yup.string().required(),
            password:Yup.string().required()
        }),
        onSubmit:function(values, { resetForm }){
            const redirect = () => {
                alert('successfully logged in')
                history.push('/Home')
                history.go(0)
            }
            dispatch(startLoginUser(values, resetForm, redirect))
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="form">
                <h2>Login</h2>

                <label>email:</label><br/>
                <input
                    type="email"
                    value={formik.values.email}
                    name="email"
                    onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && <span>{ formik.errors.email }</span>}

                <br/>

                <label>password:</label><br/>
                <input
                    type="password"
                    value={formik.values.password}
                    name="password"
                    onChange={formik.handleChange}
                />
                
                {formik.touched.password && formik.errors.password && <span>{ formik.errors.password }</span>}
                <br/>
                

                <input type="submit" value="submit" className='submit'/>
                <button onClick={handleCancel} type="button">cancel</button>
                
            </form>
            <h5>Not a user? <a href="/register">signup</a></h5>
        </div>
    )
}

export default Login