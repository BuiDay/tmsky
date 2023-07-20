import React, { useState } from "react";
import { InputNumber, Modal, Radio, Row, TimePicker } from "antd";
import { Button, Form, Input, Select, DatePicker } from "antd";
import type { FormInstance } from "antd/es/form";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import Swal from "sweetalert2";
import { IRes } from "../../ultils/interfaceApp";
import { createScheduleService } from "../../services/scheduleServices";
import { dataDate } from "../../ultils/data";

import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

interface IProps {
    isModalOpen?: any;
    setIsModalOpen?: any;
    coachList?: any
    dataCustomerList?: any
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

const tailLayoutV3 = {
    wrapperCol: { offset: 5, span: 24 },
};

const tailLayoutV1 = {
    wrapperCol: { offset: 8, span: 24 },
};


const CalendarCreateModal: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();
    const { setIsModalOpen, isModalOpen, coachList, dataCustomerList } = props;
    const [schedule, setSchedule] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [repeat, setRepeat] = useState<number[]>([]);
    const [valueRadio, setValueRadio] = useState("");
    const [showCustom, setShowCustom] = useState(false);
    const [dateValue, setDateValue] = useState<Date>();
    const [dateDuringValue, setDateDuringValue] = useState<number>(0)
    const [timeString, setTimeString] = useState("");

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const formRef = React.useRef<FormInstance>(null);

    const handleRangeTime: any = (time: Dayjs, timeString: string): void => {
        setTimeString(timeString)
    }

    const onFinish = (values: any) => {
        if (!showCustom) {
            if (schedule.length > 0) {
                const body = schedule.map((item: any) => {
                    return {
                        title: values.title,
                        CoachId: values.CoachId,
                        CustomerId: values.CustomerId,
                        start: item.start,
                        end: item.end,
                    }
                })
                Swal.fire({
                    title: 'Do you want to create schedule?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continue',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        setLoading(true);
                        const res = await createScheduleService(body) as IRes;
                        if (res.err === 0) {
                            Swal.fire(
                                {
                                    icon: 'success',
                                    title: 'Your create schedule successfully !',
                                    showConfirmButton: false,
                                    timer: 3000
                                }
                            )
                            setLoading(false);
                            setIsModalOpen(false);
                            onReset();

                        } else {
                            const mes = res.msg ? res.msg : `Your create schedule error!`;
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
            } else {
                Swal.fire(
                    {
                        icon: 'error',
                        text: "Schedule is required",
                        showConfirmButton: false,
                        timer: 3000
                    }
                )
            }
        } else {
            let body: any;
            switch (valueRadio) {
                case "1":
                    const calendar_v1 = handleCustom(dateValue);
                    body = calendar_v1.map((item) => {
                        return {
                            title: values.title,
                            CoachId: values.CoachId,
                            CustomerId: values.CustomerId,
                            start: item.slice(0, 11) + timeString[0],
                            end: item.slice(0, 11) + timeString[1],
                        }
                    })
                    console.log(body)
                    break;
                case "2":
                    let arr: string[] = []
                    repeat && repeat.forEach((item) => {
                        const calendar_v2 = handleRepeatDate(item, dateDuringValue)
                        arr = arr.concat(calendar_v2)
                    })

                    const x = arr.sort().filter((item, index) => index < dateDuringValue)
                    body = x.map((item) => {
                        return {
                            title: values.title,
                            CoachId: values.CoachId,
                            CustomerId: values.CustomerId,
                            start: item.slice(0, 11) + timeString[0],
                            end: item.slice(0, 11) + timeString[1],
                        }
                    })
                    console.log(body)
                    break;
                default:
                    break;
            }
            Swal.fire({
                title: 'Do you want to create schedule?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Continue',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    const res = await createScheduleService(body) as IRes;
                    if (res.err === 0) {
                        Swal.fire(
                            {
                                icon: 'success',
                                title: 'Your create schedule successfully !',
                                showConfirmButton: false,
                                timer: 3000
                            }
                        )
                        setLoading(false);
                        setIsModalOpen(false);
                        onReset();
                        setValueRadio("")
                        setShowCustom(false)
                        setRepeat([])
                    } else {
                        const mes = res.msg ? res.msg : `Your create schedule error!`;
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
        }
    };

    const onReset = () => {
        formRef.current?.resetFields();
    };

    const handleRepeatOn = (value: number) => {
        let arr = [...repeat];
        if (arr.includes(value)) {
            const new_arr = arr.filter(item => item !== value)
            setRepeat(new_arr)
        } else {
            arr = [...arr, value]
            setRepeat(arr)
        }
    }

    const onRangeChange: any = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            const data = [...schedule, {
                start: dateStrings[0],
                end: dateStrings[1]
            }]
            setSchedule(data)
        } else {
            console.log('Clear');
        }
    };

    const handleTitle = (value: string) => {
        let name: string = "";
        dataCustomerList.forEach((item: any) => {
            if (item.id === value) {
                name = item.FullName
            }
        })
        if (value) {
            form.setFieldsValue({ title: `Training ${name}` })
        }
        else {
            form.setFieldsValue({ title: `` })
        }
    };

    const onChange = (e: any) => {
        setValueRadio(e.target.value);
    };

    const onChangeDateDuring = (e: any) => {
        setDateDuringValue(e);
    };

    const handleRepeatDate = (dayVaule: number, during: number) => {
        let data: string[] = []
        const date = new Date();
        const getCurrentDay = date.getDay();
        if (dayVaule - getCurrentDay <= 0) {
            let day = 7 + (dayVaule - getCurrentDay)
            date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
            data.push(date.toISOString());
        } else {
            let day = (dayVaule - getCurrentDay)
            date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
            data.push(date.toISOString());
        }
        for (let i = 1; i < during; i++) {
            date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
            data.push(date.toISOString());
        }
        return data
    }

    const onChangeDatePicker = (value: DatePickerProps['value'] | RangePickerProps['value'], dateString: [string, string] | string,) => {
        setDateValue(new Date(dateString.toString()));
    }

    const handleCustom = (dateString: any) => {
        const currentDate = new Date();
        const ontheDate = new Date(dateString.toString());
        let x: string[] = []
        if (!(currentDate.toDateString() == ontheDate.toDateString())) {
            do {
                currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
                repeat && repeat?.forEach((item: number) => {
                    if (currentDate.getDay() === item) {
                        x.push(currentDate.toISOString())
                    }
                })

            } while (!(currentDate.toDateString() == ontheDate.toDateString()))
        }
        return x;
    };

    return (
        <>
            <Modal open={isModalOpen} footer={[]} onCancel={handleCancel}>
                <h1 className="text-center font-semibold text-2xl">Create schedule</h1>
                <div className="mt-[30px]">
                    <Form

                        {...layout}
                        ref={formRef}
                        name="control-ref"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        form={form}
                    >
                        <Form.Item
                            name="title"
                            label="Title"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            {...tailLayout}
                            name="CustomerId"
                            label="Customer"
                            hasFeedback
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="Select coach"
                                onChange={handleTitle}
                                allowClear showSearch
                                optionLabelProp="label"
                                filterOption={(input, option) => (option?.FullName ?? '').includes(input)}
                                options={dataCustomerList && dataCustomerList.map((item: any) => ({
                                    value: item.id,
                                    label: item.FullName,
                                }))}
                            >

                            </Select>
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
                                options={coachList && coachList.map((item: any) => ({
                                    value: item.id,
                                    label: item.FullName,
                                }))}
                            >

                            </Select>
                        </Form.Item>

                        {
                            showCustom ?
                                <>
                                    <Form.Item name="Time" {...tailLayout} label="Time">
                                        <TimePicker.RangePicker format='HH:mm:ss' onChange={handleRangeTime} />
                                    </Form.Item>
                                    <h1 className="font-semibold mb-4 text-md ml-[45px]">Repeat on:</h1>
                                    <Form.Item
                                        name="title"
                                    >
                                        <div className="flex gap-4 w-[400px] ml-[55px]">
                                            {
                                                dataDate.map((item) => {
                                                    return (
                                                        <div key={item.value} className={`circle-date ${repeat.includes(item.value) ? "active" : ""}`}
                                                            onClick={() => handleRepeatOn(item.value)}>{item.name}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Form.Item>
                                    <h1 className="font-semibold mb-4 text-md ml-[45px]">The finish:</h1>

                                    <Form.Item name="size" {...tailLayoutV3} >
                                        <Radio.Group onChange={onChange} value={valueRadio} className="flex flex-col gap-4">
                                            <Radio value={"1"} >
                                                <span className="mr-2">On the day</span>
                                                <DatePicker onChange={onChangeDatePicker} disabled={!valueRadio.includes("1")} />
                                            </Radio>
                                            <Radio value={"2"}>
                                                <span className="mr-[10px]">After</span>
                                                <InputNumber onChange={onChangeDateDuring} className="flat w-[16%]" disabled={!valueRadio.includes("2")} />
                                                <span className="ml-2">appearances</span>
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </> :
                                <>
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
                                                            rules={[{ required: true }]}
                                                        >
                                                            <RangePicker onChange={onRangeChange}
                                                                style={{ width: '85%' }}
                                                                showTime={{
                                                                    // hideDisabledOptions: true,
                                                                    // defaultValue: [dayjs('00:00', 'HH:mm'), dayjs('11:00:00', 'HH:mm')],
                                                                }}
                                                                format="YYYY-MM-DDTHH:mm:ss" />
                                                        </Form.Item>
                                                        {fields.length >= 1 ? (
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
                                </>
                        }

                        <Form.Item {...tailLayoutV1}>
                            <Button key="back" onClick={() => setShowCustom(!showCustom)} className="mr-[5px]">
                                {!showCustom ? "Custom" : "Hide Custom"}
                            </Button>
                            <Button key="back" onClick={handleCancel} className="mr-[5px]">
                                Return
                            </Button>
                            <Button type="primary" htmlType="submit" key="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default CalendarCreateModal;
