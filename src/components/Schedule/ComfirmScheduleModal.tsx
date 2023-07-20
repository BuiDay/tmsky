import React, { useEffect, useState } from "react";
import { Checkbox, Col, InputNumber, Modal, Radio, Row, Space } from "antd";
import { Button, Form, Input, Select, DatePicker } from "antd";
import type { FormInstance } from "antd/es/form";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import Swal from "sweetalert2";
import { IRes } from "../../ultils/interfaceApp";
import { getScheduleById } from "../../services/scheduleServices";


import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(weekday)

interface IProps {
    isModalOpen?: any;
    setIsModalOpen?: any;
    coachList?: any
    dataCustomerList?: any
    idSchedule?: string
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


const ComfirmScheduleModal: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();
    const { setIsModalOpen, isModalOpen, coachList, dataCustomerList, idSchedule } = props;
    const [loading, setLoading] = useState(false);
    const [valueRadio, setValueRadio] = useState("");
    const [repeat, setRepeat] = useState<number[]>([]);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const formRef = React.useRef<FormInstance>(null);

    const onFinish = (values: any) => {
        console.log(values)
    }

    const onReset = () => {
        formRef.current?.resetFields();
    };

    const tailLayoutV3 = {
        wrapperCol: { offset: 0, span: 30 },
    };

    const tailLayoutV1 = {
        wrapperCol: { offset: 11, span: 16 },
    };
    
    const DATE_FORMAT = 'YYYY-MM-DD';

    const handleGetSchedule = async () => {
        const res: any = await getScheduleById(idSchedule || "") as IRes
        console.log(res)
        if (res.err === 0) {
            const customer = res.data.customers.users.FullName
            const coach = res.data.coaches.users.FullName
            const end = res.data.end
            const start = res.data.start
            const title = res.data.title
            form.setFieldsValue({ 
                Title: title, 
                Start:new Date(start).toLocaleTimeString() + " " + new Date(start).toDateString(), 
                End: new Date(end).toLocaleTimeString() + " " + new Date(end).toDateString(), 
                Customer: customer, 
                Coach: coach,
                Schedule: [dayjs(String(dayjs(start))),dayjs(String(end))]
             })
        }
    }

    useEffect(() => {
        handleGetSchedule()
    }, [isModalOpen])


    return (
        <>
            <Modal open={isModalOpen} footer={[]} onCancel={handleCancel}>
                <h1 className="text-center font-semibold text-2xl">Edit Schedule</h1>
                <div className="mt-[30px]">
                    <Form
                        {...layout}
                        ref={formRef}
                        form={form}
                        name="control-ref"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item name="Title" label="Title" >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item name="Customer" label="Customer" >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="Coach" label="Coach" >
                            <Input/>
                        </Form.Item>
                        <Form.Item name="Start" label="Start" >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="End" label="End" >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Schedule" name="Schedule">
                            <RangePicker showTime/>
                        </Form.Item>
                        <Form.Item {...tailLayoutV1}>
                        <Button key="back" onClick={handleCancel} className="mr-[5px]">
                                Confirm
                            </Button>
                            <Button key="back" onClick={handleCancel} className="mr-[5px]">
                                Return
                            </Button>
                            <Button htmlType="submit" key="submit" type="primary">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default ComfirmScheduleModal;
