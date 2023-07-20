import React, { useState } from "react";
// import { Navigation } from '../Public'
import { Avatar, Badge, Button, Drawer, Space } from 'antd';
import { BellOutlined } from '@ant-design/icons'
import { useAppSelector } from "../../store/hook";
import { RootState } from "../../store/redux";

const Header = () => {

    const userState = useAppSelector((state: RootState) => state.user.data);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    
    return (
        <div className="w-full flex justify-between h-[80px] px-4 shadow-md z-10">
            <div className="flex w-full px-5 justify-start gap-3 items-center font-bold text-purple-700">
                <a className="h-[80%]" href="/">
                    <img src={require("../../static/images/TMS.png")} alt="" />
                </a>
                <span className="text-lg">BongbanTV</span>
            </div>
            <div className="flex items-center justify-end w-full gap-[18px] px-2">
                <Drawer title="Notification" placement="right" onClose={onClose} open={open}>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents... </p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents... </p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents... </p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents... </p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents... </p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                    <p className="cursor-pointer p-4 bg-white hover:bg-gray-100">Some contents...</p>
                </Drawer>
                <Space className="mr-[10px] cursor-pointer p-2 rounded-full shadow-md" onClick={showDrawer}>
                    <Badge count={10}>
                        <BellOutlined style={{ fontSize: "25px" }} />
                    </Badge>
                </Space>
                <div className="">
                    <p className="font-semibold text-purple-700">Hi, {userState?.FullName}</p>
                    <p className="text-xs text-right">Role: {userState?.Role}</p>
                </div>
                <div className="h-[75%]">
                    <img
                        src={require("../../static/images/anon-avatar.png")}
                        alt="avatar"
                        className='object-cover rounded-full border-2 border-white'
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
