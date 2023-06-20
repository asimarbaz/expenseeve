import { useFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { startRegisterUser } from '../../reduxStore/action/User'
import axios from 'axios'
import { startBudgetCreate } from '../../reduxStore/action/Budget'

const Register = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            username:'',
            email:'',
            mobile:'',
            password:'',
            occupation:''
        },
        validationSchema:Yup.object({
            username:Yup.string().required(),
            email:Yup.string().required(),
            mobile:Yup.number().required(),
            password:Yup.string().required(),
            occupation:Yup.string()
        }),
        onSubmit:function(values, { resetForm }){
            const redirect = (id) => {
                // history.push('/login')
                // history.go(0)
                //dispatch(startBudgetCreate(id))
                axios.post('http://localhost:3040/api/user/budget', {user:id})
                     .then((res) => {
                        history.go(0)
                     })
                     .catch((err) => {
                        alert(err.message)
                     })
                history.push('/login')
                history.go(0)
            }
            //console.log(values)
            dispatch(startRegisterUser(values, resetForm, redirect))
        }
    })

    const handleCancel = (e) => {
        history.push('/Home');
    }

    return (
        <div>
            
            <form onSubmit={formik.handleSubmit} className="form">
                <h2>Register</h2>
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
                <button onClick={handleCancel}>cancel</button>
                
            </form>
            <div>
                <h5> Already a user? <a href="/login">login</a></h5>
            </div>
        </div>
    )
}

export default Register