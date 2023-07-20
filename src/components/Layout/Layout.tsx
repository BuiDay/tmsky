import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from '../Header/Header'
import Sidebar from '../SideBar/Sidebar'
// import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
// import { path } from '../../ultils/constant'
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { RootState } from '../../store/redux';
import { apiGetCurrent } from '../../store/features/user/userSilce';
import { logout } from '../../store/features/auth/authSilce';
import { FloatButton } from 'antd';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
const Layout = () => {

    const dispatch = useAppDispatch();
    const authState = useAppSelector((state: RootState) => state.auth);
    const userState = useAppSelector((state: RootState) => state.user.data);
    const user = useAppSelector((state: RootState) => state.user);

    useLayoutEffect(() => {
        if (authState.isLoggedIn) {
            setTimeout(() => {
                dispatch(apiGetCurrent());
            }, 1000)
        }
    }, [])

    const tokenExprie = () => {
        if (user.isError) return (dispatch(logout()), <Navigate to={`/login`} replace={true} />)
    }

    useEffect(() => {
        setTimeout(() => {
            tokenExprie()
        }, 2000)
    }, [user])


    if (!authState.isLoggedIn) return (<Navigate to={`/login`} replace={true} />)
    if (userState && userState?.createdAt === userState?.updatedAt) return <Navigate to={`/change-password`} replace={true} />

    return (
        <div className='w-full h-screen flex flex-col items-center'>
            <Header />
            <div className='flex w-full flex-auto'>
                <Sidebar />
                <div className='flex-auto bg-[#F7F5FF] shadow-md h-full'>
                    <Outlet />
                </div>
            </div>
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{ right: 24 }}
                icon={<CustomerServiceOutlined />}
            >
                <FloatButton />
                <FloatButton icon={<CommentOutlined />} />
            </FloatButton.Group>
        </div>
    )
}

export default Layout