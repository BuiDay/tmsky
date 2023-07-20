import React, { useEffect, useState } from 'react';
import BreadcrumCustom from '../../components/Common/BreadcrumbCustom/BreadcrumCustom';
import Meta from '../../components/Common/Meta/Meta';
import StaffTable from '../../components/Staff/StaffTable';
import SearchInput from '../../components/Common/SearchInput/SearchInput';
import Button from '../../components/Common/Button/Button';
import { apiGetStaffList } from '../../services/staffServices';
import CreateStaffModal from '../../components/Staff/CreateStaffModal';

const Staff = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataStaffList, setDataStaffList] = useState([])
    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleApiStaffList = async () => {
        const res: any = await apiGetStaffList();
        if (res.err === 0) {
            setDataStaffList(res.data)
        }
    }

    useEffect(() => {
        handleApiStaffList()
    }, [isModalOpen])

    return (
        <>
            <Meta title="Staff" />
            <BreadcrumCustom items={[{ title: <a href="/">Home</a> }, { title: "Staff List" }]} />
            <div className='p-4'>
                <h1 className='text-3xl text-main font-medium'>Staff List</h1>
                <div className='mt-4 px-[27px]'>
                    <div className='flex justify-between'>
                        <div className='w-[500px] mb-[30px]'>
                            <SearchInput />
                        </div>
                        <div>
                            <Button text='Create' textColor='text-white' bgColor="bg-green-500" onClick={() => showModal()} />
                        </div>
                    </div>
                    <div className='rounded-[10px] bg-white w-full p-5 shadow-tb'>
                        <StaffTable dataStaffList={dataStaffList} />
                    </div>
                </div>
                <CreateStaffModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>
        </>
    );
}

export default Staff;