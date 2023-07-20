import React, { useState } from "react";
import { Modal } from "antd";
import { Button, Form, Input, Select } from "antd";
import type { FormInstance } from "antd/es/form";
import { apiRegister } from "../../services/authServices";
import Swal from 'sweetalert2'
import { IRes } from "../../ultils/interfaceApp";

interface IProps {
    isModalOpen?: any;
    setIsModalOpen?: any;
}

const { Option } = Select;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { offset: 2, span: 15 },
};

const tailLayout = {
    wrapperCol: { offset: 2, span: 10 },
};

const tailLayoutV1 = {
    wrapperCol: { offset: 15, span: 16 },
};

// const formItemLayoutWithOutLabel = {
//     // labelCol: {
//     //     xs: { span: 24 },
//     //     sm: { span: 6 },
//     //   },
//     wrapperCol: {
//         xs: { span: 24, offset: 2 },
//         sm: { span: 24, offset: 2 },
//     },
// };

const CreateStaffModal: React.FC<IProps> = (props) => {

    const [loading, setLoading] = useState(false);
    const { setIsModalOpen, isModalOpen } = props;
    const formRef = React.useRef<FormInstance>(null);
    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onReset = () => {
        form.resetFields();
    };


    const onFinish = async (values: any) => {
        Swal.fire({
            title: 'Do you want to create staff?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Continue',
        }).then(async (result) => {
           if(result.isConfirmed){
            setLoading(true);
            const res = await apiRegister(values) as IRes;
            console.log(res)
            if (res.err === 0) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: 'Your create staff successfully !',
                        showConfirmButton: false,
                        timer: 3000
                    }
                )
                setLoading(false);
                setIsModalOpen(false);
                onReset();
            } else {
                const mes = res.msg ? res.msg : `Your create staff error!`;
                Swal.fire(
                    {
                        icon: 'error',
                        text: mes,
                        showConfirmButton: false,
                        timer: 3000
                    }
                )
                setLoading(false);
            }
           }
        })
    };

    return ( 
        <>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}
            >
                <h1 className="text-center font-semibold text-2xl">Create staff</h1>
                <div className="mt-[30px]">
                    <Form
                        {...layout}
                        form={form}
                        ref={formRef}
                        name="control-ref"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            name="FullName"
                            label="Full name"
                            hasFeedback
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="PhoneNumber"
                            label="Phone Number"
                            hasFeedback
                            rules={[{ required: true, pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),message: "'Phone number' is not a valid email",}]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="Email" hasFeedback label="Email" rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="Password" hasFeedback label="Password" rules={[{ required: true }]}>
                            <Input.Password type="password" placeholder="Password" />
                        </Form.Item> 
                        <Form.Item
                            {...tailLayout}
                            name="Gender"
                            label="Gender"
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder="Select a option"
                                allowClear
                            >
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item  {...tailLayout} name="Role" label="Role" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                                mode="multiple"
                            >
                                <Option value="Admin">Admin</Option>
                                <Option value="Coach">Coach</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) =>
                                prevValues.Role !== currentValues.Role
                            }
                        >
                            {({ getFieldValue }) => {
                                return getFieldValue("Role")?.includes("Coach") ? (
                                    <Form.Item
                                        name="Level"
                                        label="Level"
                                        rules={[{ required: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                ) : null
                            }
                            }
                        </Form.Item>
                        <Form.Item {...tailLayoutV1}>
                            <Button key="back" onClick={handleCancel} className="mr-[5px]">
                                Return
                            </Button>
                            <Button htmlType="submit" loading={loading} key="submit" type="primary">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default CreateStaffModal;
