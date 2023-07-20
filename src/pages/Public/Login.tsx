import React, { useEffect, useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AiFillLock } from 'react-icons/ai';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Meta from "../../components/Common/Meta/Meta";
import { Button, Checkbox, Form, Input } from 'antd';
import { IAuthLogin } from "../../store/features/InterfaceReducer";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { login, resetLogin } from "../../store/features/auth/authSilce";
import { RootState } from "../../store/redux";
import { apiGetCurrent } from "../../store/features/user/userSilce";
import authService from "../../store/features/auth/authService";
import { IRes } from "../../ultils/interfaceApp";
import axios from '../../ultils/axiosConfig'

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state: RootState) => state.auth);
    const userState = useAppSelector((state: RootState) => state.user.data);
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = async (values: IAuthLogin) => {
        if (values) {
            dispatch(login(values))
        }
    };

    const onFinish_V2 = async (values: any) => {
        if (values) {
            setLoading(true);
            const Password = values.Password_V2;
            const res = await authService.apiChangePassword({ Password }) as IRes
            if (res.err === 0) {
                setLoading(false);
                dispatch(resetLogin());
                navigate("/")
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (authState.isLoggedIn) {
            setLoading(true);
            setTimeout(() => {
                dispatch(apiGetCurrent());
                setLoading(false);
            }, 1000)
        }
    }, [authState.isLoggedIn])

    useEffect(() => {

        if (userState && userState?.createdAt === userState?.updatedAt) {
            navigate(`/change-password`)
        }
        if (!authState.isLoggedIn) {
            navigate("/login")
        }
        if (userState && !(userState?.createdAt === userState?.updatedAt)) {
            dispatch(resetLogin());
            navigate(`/`)
        }
    }, [userState])

    return (
        <>
            <Meta title="Login" />
            <div className="h-screen flex justify-center items-center bg-orange-600">
                <div className="h-[500px] w-[700px] bg-white rounded-xl overflow-hidden">
                    <div className="flex w-full h-full items-center">
                        <div className="w-[50%]">
                            <div className="w-[90%] m-auto">
                                <img src={require("../../static/images/TMS.png")} alt="" />
                            </div>
                        </div>
                        <div className="w-[50%] h-full relative pr-5">
                            <h1 className="text-3xl font-semibold absolute top-[50px] left-[130px]">Login</h1>
                            <div className='w-full h-full flex flex-col justify-center pt-8'>
                                {
                                    location.pathname === "/login" && (
                                        <Form
                                            name="normal_login"
                                            className="login-form"
                                            initialValues={{ remember: true }}
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                        >
                                            <Form.Item
                                                name="PhoneNumber"
                                                rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                                            >
                                                <Input className="h-[45px] text-lg" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                            </Form.Item>
                                            <Form.Item
                                                name="Password"
                                                rules={[{ required: true, message: 'Please input your Password!' }]}
                                            >
                                                <Input
                                                    className="h-[45px] text-lg"
                                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                            </Form.Item>
                                            <Form.Item>
                                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                                    <Checkbox>Remember me</Checkbox>
                                                </Form.Item>

                                                <a className="login-form-forgot" href="">
                                                    Forgot password
                                                </a>
                                            </Form.Item>
                                            <Form.Item>
                                                <span className="text-error">{authState.isError  ? authState.msg :""}</span>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" loading={loading} className="login-form-button text-lg h-[40px]">
                                                    Log in
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    )}

                                {
                                    location.pathname === "/change-password" && (
                                        (

                                            <Form
                                                name="change-password"
                                                className="login-form"
                                                initialValues={{ remember: true }}
                                                onFinish={onFinish_V2}
                                                onFinishFailed={onFinishFailed}
                                            >
                                                <p className="text-center mb-[50px] text-lg">Please change password at first login!</p>
                                                <Form.Item
                                                    name="Password_V2"
                                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                                >
                                                    <Input
                                                        className="h-[45px] text-lg"
                                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                                        type="password"
                                                        placeholder="Password"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="confirm"
                                                    dependencies={['Password_V2']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please confirm your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('Password_V2') === value) {
                                                                    return Promise.resolve();
                                                                }
                                                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input className="h-[45px] text-lg" type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" loading={loading} className="login-form-button text-lg h-[40px]">
                                                        Comfirm
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;
