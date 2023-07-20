import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Authorized: React.FC = () => {
    
    const navigate = useNavigate()

    const handleHome = () =>{
        navigate("/")
    }
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={()=>handleHome()}>Back Home</Button>}
        />)
};

export default Authorized;