import { Button, Modal } from 'antd';
import { useState } from 'react';
import Form from './form';

const AddExpense = (props) => {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
        <Button type="primary" onClick={showModal}>
            Add Expense
        </Button>
        <Modal
            title=""
            open={open}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={null}
        >
            <div>
                <Form />
            </div>
        </Modal>
        
        </>
    );
};

export default AddExpense;