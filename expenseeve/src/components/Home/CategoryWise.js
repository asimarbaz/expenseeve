import axios from 'axios'
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
, PieChart, Pie} from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { startListExpense } from '../../reduxStore/action/Expense';
import { startCategoriesList } from '../../reduxStore/action/Category';

const CategoryWise = (props) => {
    const dispatch = useDispatch()
    const [categoriess, setCategories ] = useState()
    

    useEffect(() => {
        dispatch(startListExpense())
        dispatch(startCategoriesList(setCategories))
    }, [])
    const Expenses = useSelector((state) => {
        return state.Expenses
    })

    const NotDeletedExpenses = Expenses.filter((exp) => {
        return !exp.isDeleted
    })

    const categories = useSelector((state) => {
        return state.Category
    })
    
    const data2 = []

    categories?.forEach((category) => {
        let name = category.name
        let value = 0
        NotDeletedExpenses.forEach((expense) => {
            if (category._id === expense.category) {
                value += Number(expense.amount)
            }
        })
        data2.push({ name, value })
    })
    
    const data = data2.filter((dat) => {
        return dat.value !== 0
    } )
    

    return (
        <div >
            <h3>Category Wise</h3>
            {data.length > 4 ? (
                <BarChart
                    width={550}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='name' />
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            ) : (
                <PieChart width={300} height={300} >
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip  />
                </PieChart>
            )}
        </div>
    )
}

export default CategoryWise;