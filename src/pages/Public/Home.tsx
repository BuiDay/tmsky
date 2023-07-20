import React from 'react';
import Meta from '../../components/Common/Meta/Meta';
import BreadcrumCustom from '../../components/Common/BreadcrumbCustom/BreadcrumCustom';
import { RadarChart } from '../../components/Home/RadarChart';
import { Card, Col, Row, Timeline } from 'antd';
import StatisticHome from '../../components/Home/StatisticHome';
import { ClockCircleOutlined } from '@ant-design/icons';
import PieChart from '../../components/Home/PieChart';
import { Line } from 'react-chartjs-2';
import { LineChart } from '../../components/Home/LineChart';

const Home = () => {
  return (
    <div>
      <Meta title="User" />
      <BreadcrumCustom items={[{ title: <a href="/">Home</a> }]} />
      <div className='p-[40px]'>
        <Row className='justify-between'>
          <Col xl={15}>
            <StatisticHome />
            <Row>
              <Col xl={24} className='mt-5'>
                <LineChart />
              </Col>
            </Row>

          </Col>
          <Col xl={8}>
            <Row>
              <Col xl={24} className='mb-5'>
                <RadarChart />
              </Col>
            </Row>
            <Card>
              <h1 className='text-center mb-4 text-lg'>Timeline</h1>
              <Timeline
                mode={"left"}
                items={[
                  {
                    label: '2023-09-01',
                    children: 'Create a services',
                  },
                  {
                    label: '2023-09-01',
                    children: 'Solve initial network problems',
                  },
                  {
                    children: 'Technical testing',
                  },
                  {
                    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                    label: '2023-09-01',
                    children: 'Network problems being solved',
                  },
                ]}
              />
            </Card>

          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;