import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "antd";
import "./User.css";
import { Button, Form, Input, Select, DatePicker } from "antd";
import type { FormInstance } from "antd/es/form";
import { TimePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { apiGetCoachList } from "../../services/staffServices";
import { IRes } from "../../ultils/interfaceApp";
import Swal from 'sweetalert2'
import { apiRegister } from "../../services/authServices";
import { createScheduleService } from "../../services/scheduleServices";
const { v4 } = require('uuid')

interface IProps {
    isModalOpen?: any;
    setIsModalOpen?: any;
}

const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { offset: 2, span: 15 },
};

const tailLayout = {
    wrapperCol: { offset: 2, span: 10 },
};


const formItemLayoutWithOutLabel = {
    // labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 6 },
    //   },
    wrapperCol: {
        xs: { span: 24, offset: 2 },
        sm: { span: 24, offset: 2 },
    },
};

const formItemLayout = {
    labelCol: {
        //   xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        //   xs: { span: 24, offset: 2 },
        sm: { span: 18, offset: 2 },
    },
};

const tailLayoutV1 = {
    wrapperCol: { offset: 15, span: 16 },
};

const UpdateCustomerModal: React.FC<IProps> = (props) => {
    const { setIsModalOpen, isModalOpen } = props;
    const [coachList, setCoachList] = useState<any>(); 
    const [loading, setLoading] = useState(false);
    const [schedule, setSchedule] = useState<any>([]);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const formRef = React.useRef<FormInstance>(null);

    const onFinish = (values: any) => {
        const userId = v4();
        const data = {...values,userId,Role:"Customer"}
        Swal.fire({
            title: 'Do you want to create staff?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Continue',
        }).then(async (result) => {
           if(result.isConfirmed){
            setLoading(true);
            const res = await apiRegister(data) as IRes;
            if (res.err === 0) {
                if(schedule.length > 0){
                    const body = schedule.map((item:any)=>{
                        return{
                            ...item,
                            CustomerId:userId,
                            CoachId:values.CoachId,
                            title:`Training ${values.FullName}`
                        }}) 
                        const res = await createScheduleService(body)
                }
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

    const onRangeChange:any = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            const data = [...schedule,{
                start:dateStrings[0],
                end:dateStrings[1]
            }]
            setSchedule(data)
        } else {
          console.log('Clear');
        }
      };
    const onReset = () => {
        formRef.current?.resetFields();
    };

    const handleCoachList = async ()=>{
        const res:IRes = await apiGetCoachList() as IRes;
        if(res.err===0)
            setCoachList(res.data)
    }

    useEffect(()=>{
        handleCoachList();
    },[])

    return (
        <>
            <Modal open={isModalOpen} footer={[]} onCancel={handleCancel}>
                <h1 className="text-center font-semibold text-2xl">Update customer</h1>
                <div className="mt-[30px]">
                    <Form
                        {...layout}
                        ref={formRef}
                        name="control-ref"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            name="FullName"
                            label="Full Name"
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
                        <Form.Item name="Password" hasFeedback label="Password" rules={[{ required: true }]}>
                            <Input.Password type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="Email" hasFeedback label="Email" rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout} name="Role" label="Role">
                            <Input defaultValue={'Customer'} disabled/>
                        </Form.Item>
                        <Form.Item
                            {...tailLayout}
                            name="Gender"
                            label="Gender"
                            hasFeedback
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
                        <Form.Item
                            {...tailLayout}
                            name="Level"
                            label="Level"
                            hasFeedback
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder="Select a option"
                                allowClear
                            >
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                                <Option value="D">D</Option>
                                <Option value="E">E</Option>
                                <Option value="F">F</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            hasFeedback
                            shouldUpdate={(prevValues, currentValues) =>
                                prevValues.gender !== currentValues.gender
                            }
                        >
                            {({ getFieldValue }) =>
                                getFieldValue("gender") === "other" ? (
                                    <Form.Item
                                        name="customizeGender"
                                        label="Customize Gender"
                                        rules={[{ required: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                      
                        <Form.Item
                            {...tailLayout}
                            name="CoachId"
                            label="Coach"
                            hasFeedback
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="Select coach" 
                                    allowClear showSearch 
                                    optionLabelProp="label"
                                    filterOption={(input, option) => (option?.FullName ?? '').includes(input)}
                                    options={coachList && coachList.map((item:any) => ({
                                        value: item.id,
                                        label: item.FullName,
                                      }))}
                            >

                            </Select>
                        </Form.Item>

                        <h1 className="font-semibold mb-4">Planned training schedule:</h1>
                        <Form.List
                            name="Schedule"
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={`Seaction ${index + 1}`}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                noStyle
                                            >
                                                <RangePicker onChange={onRangeChange} 
                                                    style={{ width: '80%' }} 
                                                    showTime={{
                                                        hideDisabledOptions: true,
                                                        defaultValue: [dayjs('00:00', 'HH:mm'), dayjs('11:00:00', 'HH:mm')],
                                                    }} 
                                                    format="YYYY-MM-DDTHH:mm:ss" />
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item wrapperCol={{ span: 10, offset: 8 }}>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{ width: '100%' }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add section
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
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

export default UpdateCustomerModal;
