import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { startCreateExpense } from '../../reduxStore/action/Expense'


const Form = (props) => {

    const categories = useSelector((state) => {
        return state.Category
    })

    const history = useHistory()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            title:'',
            amount:'',
            category:'',
            date:''
        },
        validationSchema:Yup.object({
            title:Yup.string().required(),
            amount:Yup.number().required(),
            category:Yup.string(),
            date:Yup.date().required()
        }),
        onSubmit:function(values, { resetForm }){
            const redirect = () => {
                history.push('/Home')
                history.go(0)
                
            }
            console.log(values)
            dispatch(startCreateExpense(values, resetForm, redirect))
            axios.post('http://localhost:3040/api/user/expense', values, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
                .then((res) => {
                    alert('expense added')
                    resetForm()
                    redirect()
                })
                .catch((err) => {
                    alert(err.message)
                } )
            })
        }
    })

    const handleCancel = (e) => {
        history.go(0);
    }

    return (
        <div>
            
            <form onSubmit={formik.handleSubmit} className="form">
                <h2>Add Expense</h2>
                <label>title:</label><br/>
                <input
                    type="text"
                    value={formik.values.title}
                    name="title"
                    onChange={formik.handleChange}

                />
                {formik.touched.title && formik.errors.title && <span>{ formik.errors.title }</span>}

                <br/>
                <label>amount:</label><br/>
                <input
                    type="number"
                    value={formik.values.amount}
                    name="amount"
                    onChange={formik.handleChange}
                />
                {formik.touched.amount && formik.errors.amount && <span>{ formik.errors.amount }</span>}

                
                <br/>
                <label>category:</label><br/>
                <select
                    type="select"
                    value={formik.values.category}
                    name="category"
                    onChange={formik.handleChange}
                >
                    <option value="">select</option>
                    {categories?.map((item, index) => {
                        return <option key={index} value={item._id}>{item.name}</option>
                    })}
                </select>
                {formik.touched.category && formik.errors.category && <span>{ formik.errors.category }</span>}

                <br/>
                <br/>
                <label>date:</label><br/>
                <input
                    type="date"
                    value={formik.values.date}
                    name="date"
                    onChange={formik.handleChange}
                />
                {formik.touched.date && formik.errors.date && <span>{ formik.errors.date }</span>}
                

                <input type="submit" value="submit" className='submit'/>
                <button onClick={handleCancel}>cancel</button>
                
            </form>
            
        </div>
    )
}

export default Form