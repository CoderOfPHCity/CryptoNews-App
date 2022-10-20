import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from './API/CryptApi';
import LineChart from './LineCharts';

const { Title, Text } = Typography;
const { Option } = Select;


function Cryptodetail() {

  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const detail = data?.data?.coin;

  if (isFetching) return <h2>Loading...</h2>;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${detail?.price && millify(detail?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: detail?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${detail?.volume && millify(detail?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${detail?.marketCap && millify(detail?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${detail?.allTimeHigh?.price && millify(detail?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: detail?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: detail?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: detail?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${detail?.supply?.total && millify(detail?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${detail?.supply?.circulating && millify(detail?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  return (
    <div>
       <Col className='coin-detail-container'>
         <Col className='coin-heading-container'>
         <Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </Title>
           <p>
             {detail.name} live available prices of crytpocurrencies in US dollars

           </p>
         </Col>
         <Select
         defaultValue ='7d'
         className='select-timeperiod'
         placeholder='Select Time period' 
         onChange={(value) => setTimeperiod(value)}
         >
           {time.map((date) => <Option key={date}>{date}</Option>)}
         </Select>
         <LineChart coinHistory={coinHistory} currentPrice={millify(detail?.price)} coinName={detail?.name} />

         <Col className='stats-container'>
           <Col className='coin-value-statistics'>
             <Col className='coin-value-statistics-heading'>
               <Title level={3} className='coin-detail'>
                 {detail.name} statistics
               </Title>
               <p>Complete cryyptocurrency stats of {detail.name}</p>
             </Col>
             {stats.map(({icon, title, value})=>(
               <Col className='coin-stats'>
                 <Col className='coin-stats-name'>
                   <Text>{icon}</Text>
                   <Text>{title}</Text>
                 </Col>
                 <Text className='stats'>{value}</Text>
               </Col>
             ))}
           </Col>

           <Col className='other-stats-info'>
             <Col className='coin-value-statistics-heading'>
               <Title level={3} className='coin-detail'>
                 More statistics
               </Title>
               <p>Complete cryyptocurrency stats of all crytpocurrencies </p>
             </Col>
             {genericStats.map(({icon, title, value})=>(
               <Col className='coin-stats'>
                 <Col className='coin-stats-name'>
                   <Text>{icon}</Text>
                   <Text>{title}</Text>
                 </Col>
                 <Text className='stats'>{value}</Text>
               </Col>
             ))}
           </Col>
         </Col>
         <Col className ='coin-desc-link'>
           <Row className='coin-desc'>
             <Title level={3} className='coin-detail-heading'>
               Facts about {detail.name}
               {HTMLReactParser(detail.description)}
             </Title>
           </Row>
           <Col className='coin-links'> 
           <Title level={5} className='coin-details-heading'>
             {detail.name} links
           </Title>
           {detail.links.map((link) =>(
             <Row className='coin-link' key={link.name}>
               <Title level={5} className='link-name'>
                 {link.type}
               </Title>
               <a href={link.url} target="_blank" rel='noreferrer'>
                     {link.name}
               </a>
             </Row>
           ))}
           </Col>
         </Col>
      </Col>

    </div>
  )
}

export default Cryptodetail