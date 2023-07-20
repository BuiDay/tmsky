import React, { useEffect, useState } from 'react';
import BreadcrumCustom from '../../components/Common/BreadcrumbCustom/BreadcrumCustom';
import Meta from '../../components/Common/Meta/Meta';
import SearchInput from '../../components/Common/SearchInput/SearchInput';
import Button from '../../components/Common/Button/Button';
import CreateCustomerModal from '../../components/Customer/CreateCustomerModal';
import { apiGetCustomerList } from '../../services/customerServices';
import CustomerTable from '../../components/Customer/CustomerTable';

const Customer = () => {
    const [dataCustomerList, setCustomerList] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleApiCustomerList = async ()=>{
        const res:any = await apiGetCustomerList();
        if(res.err === 0){
            setCustomerList(res.data)
        }
    }

    useEffect(()=>{
        handleApiCustomerList()
    },[isModalOpen])
    
    return (
        <div>
            <Meta title="User"/>
            <BreadcrumCustom items={[{title:<a href="/">Home</a>},{title:"Customer List"}]}/>
            <div className='p-4'>
                <h1 className='text-3xl text-main font-medium'>Customer List</h1>
                <div className='mt-4 px-[27px]'>
                    <div className='flex justify-between'>
                        <div className='w-[500px] mb-[30px]'>
                            <SearchInput />
                        </div>
                        <div>
                            <Button text={'Create'} textColor='text-white' bgColor="bg-green-500" onClick={()=>showModal()}/>
                        </div>
                     </div>
                    <div className='rounded-[10px] bg-white w-full p-5 shadow-tb'>
                        <CustomerTable dataCustomerList={dataCustomerList}/>
                    </div>
                </div>
            </div>
            <CreateCustomerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    );
};

export default Customer;