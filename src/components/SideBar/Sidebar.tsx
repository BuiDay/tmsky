import React, { useEffect, useLayoutEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, HomeOutlined, UserOutlined, CalendarOutlined, CarryOutOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { AiOutlineLogout } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { logout } from '../../store/features/auth/authSilce';
import { resetGetCurrent } from '../../store/features/user/userSilce';
import { RootState } from '../../store/redux';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  disabled?: boolean,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    disabled
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Home', '/', <HomeOutlined  />),
  getItem('User', 'user', <UserOutlined />, [
    getItem('Customer List', 'customer', <TeamOutlined  />),
    getItem('Staff List', 'staff', <TeamOutlined  />),
    getItem('Option 3', '3'),
  ]),
  getItem('Schedule', 'schedule', <CalendarOutlined  />, [
    getItem('Training Schedule', 'training-schedule', <CarryOutOutlined  />),
    getItem('Option 6', '6'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Setting', 'setting', <SettingOutlined />, [
    getItem('Profile', '9'),
    getItem('Change Password', '10'),
  ]),
  getItem('Logout', 'logout', <AiOutlineLogout />)
];



const SideBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let menuExclude:string[] = [] 

  const userState = useAppSelector((state: RootState) => state.user.data);

  if(!(userState?.Role === "Admin")){
      menuExclude = ['user']
  }

  const [isSelectedKeys, setIsSelectedKeys] = useState(location.pathname.split("/")[2]?.length > 0 ? location.pathname.split("/")[2] : "/")
  const [isOpenKeys, setIsOpenKeys] = useState(location.pathname.split("/")[1]?.length > 0 ? location.pathname.split("/")[1] : "/")

  const collapsed = useAppSelector((state: RootState) => state.header.isCollapsed);

  const handleNavigate = (key: any) => {
    if (key[0] !== "logout") {
      if (key.length > 1)
        navigate(`/${key[1]}/${key[0]}`)
      else
        navigate(`/`)
    } else {
      dispatch(resetGetCurrent())
      dispatch(logout())
    }
  }

  return (
    <div className='pt-2'>
        <div style={{width: !collapsed ? 230 : 80,transition:"all 0.4s"}}>
          <Menu
            defaultSelectedKeys={[isSelectedKeys]}
            defaultOpenKeys={[isOpenKeys]}
            mode="inline"
            inlineCollapsed={collapsed}
            items={items.filter((item:any,index:number)=> !menuExclude.includes(item?.key))}
            onClick={(e) => { handleNavigate(e.keyPath) }}
          />
        </div>
    </div>

  );
};

export default SideBar;