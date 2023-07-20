import React, { useEffect, useState } from "react";
import BreadcrumCustom from "../../components/Common/BreadcrumbCustom/BreadcrumCustom";
import Meta from "../../components/Common/Meta/Meta";
import CalendarCus from "../../components/Schedule/CalendarCus";
import CalendarCreateModal from "../../components/Schedule/CalendarCreateModal";
import { getScheduleListService } from "../../services/scheduleServices";
import { IRes } from "../../ultils/interfaceApp";
import { apiGetCoachList } from "../../services/staffServices";
import { apiGetCustomerList } from "../../services/customerServices";

const TrainingSchedule = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listSchedule, setListSchedule] = useState<any>()
    const [coachList, setCoachList] = useState<any>();
    const [dataCustomerList, setCustomerList] = useState([])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleListSchedule = async () => {
        const res = await getScheduleListService() as IRes;
        if (res.err === 0) {
            setListSchedule(res.data)
        }
    }

    const handleCoachList = async () => {
        const res: IRes = await apiGetCoachList() as IRes;
        if (res.err === 0)
            setCoachList(res.data)
    }

    const handleApiCustomerList = async () => {
        const res: any = await apiGetCustomerList();
        if (res.err === 0) {
            setCustomerList(res.data)
        }
    }

    useEffect(() => {
        handleListSchedule();
        handleCoachList();
        handleApiCustomerList();
    }, [isModalOpen])

    return (
        <div>
            <Meta title="Schedule" />
            <BreadcrumCustom items={[{ title: <a href="/">Home</a> }, { title: "Training Schedule" }]} />
            <div className="p-4">
                <h1 className='text-3xl text-main font-medium'>Training Schedule</h1>
                <div className="p-[20px]">
                    <div className="rounded-[10px] bg-white w-full p-[20px] shadow-tb">
                        <CalendarCus showModal={showModal} listSchedule={listSchedule} />
                    </div>
                </div>
            </div>
            <CalendarCreateModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                coachList={coachList}
                dataCustomerList={dataCustomerList}
            />
        </div>
    );
};

export default TrainingSchedule;
