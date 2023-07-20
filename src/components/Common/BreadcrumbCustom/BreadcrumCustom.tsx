import { Breadcrumb } from 'antd';
import React, { useState } from 'react';
import {
    ContainerOutlined,
    DesktopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';
import { useAppDispatch } from '../../../store/hook';
import { showMenu } from '../../../store/features/header/headerSilce';
  
interface IProps{
    items?:any
}   

const BreadcrumCustom:React.FC<IProps> = ({items}) => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useAppDispatch()
    const toggleCollapsed = () => {
        dispatch(showMenu(!collapsed))
        setCollapsed(!collapsed);
    };
    return (
        <div className='py-3 px-1 bg-white shadow-sm flex'>
            <div className='mr-[20px]'>
                <div className='text-gray-500' onClick={toggleCollapsed} style={{fontSize:20,lineHeight:1,cursor:"pointer"}}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </div>
            </div>
            <Breadcrumb className='text-lg'
                // items={[
                //     {
                //         title: 'Home',
                //     },
                //     {
                //         title: <a href="">Application Center</a>,
                //     },
                //     {
                //         title: <a href="">Application List</a>,
                //     },
                //     {
                //         title: 'User',
                //     },
                // ]}
                items={items}
            />
        </div>
    );
};

export default BreadcrumCustom;