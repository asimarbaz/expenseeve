import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startShowCategories } from '../../reduxStore/action/Category';

const ReadOnly = (props) => {
    const dispatch = useDispatch()
    const { expense, handleEditClick, handleDeleteClick } = props
    const [categoryData, setCategoryData] = useState("")

    useEffect(() => {
        const CategoryDataReq = (data) => {
            setCategoryData(data)
        }
        dispatch(startShowCategories(expense.category, CategoryDataReq))
    }, [])
    
    return (
        <tr>
            <td>
                <button
                    onClick = {(e) =>handleEditClick(e, expense)}
                >
                    <EditTwoTone />
                </button>
            </td>
            <td>
                {
                    <span>{categoryData.name}</span>
                }
            </td>
            <td>{expense.title}</td>
            <td>{expense.amount}</td>
            <td>{expense.date.slice(0,10)}</td>
            <td>
                <button
                    onClick = {(e) =>handleDeleteClick(e, expense)}
                >
                    <DeleteTwoTone />
                </button>
            </td>
        </tr>
    )
}

export default ReadOnly;