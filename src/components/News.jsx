import React, {useState} from 'react'
import { Select, Typography, Row, Col, Avatar, Card} from 'antd'
//import moment from 'moment'

import {useGetCryptosQuery} from './API/CryptApi'
import { useGetCryptoNewsQuery } from './API/Newsapi'

const {Text, Title}= Typography;
const {Option} = Select;
let demoImg

function News({simplified}) {
  const [newsCategory, setNewsCatagory] = useState('crypto')
  const {data} = useGetCryptosQuery(100)
  const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 12})
  return (
    
    <div>
      <Row gutter={[24, 24]}>
      {!simplified &&(
      <Col span={24}>
      <Select
      showSearch
      className='select-news'
      placeholder='select a crypto'
      onChange={(value) => setNewsCatagory(value)}
      filterOption={(input, option) => option.children.tolowercase().indexof(input.toLowerCase())>0}
      >
      <Option value='Cryptocurrency'>Crytpos</Option>
      {data?.data?.coins.map((coin)=>
        <Option value={coin.name}>{coin.name}</Option>)}
      </Select>
      </Col>
    )}
        {cryptoNews?.value.map((news)=>(
          <Col xs={24} sm={12} lg={8} key={news.id}>
            <Card hoverable classname="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className='news-image-container'>
                  <Title classname="news-title" level={4}>{news.name}</Title>
                  <img style={{maxWidth:'200px', maxheight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoImg} alt="cryptoNews"/>               
                </div>
                <p>
                  {news.description>100 ? `${news.description.substring(0, 100)}`: news.description}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contenturl  || demoImg} alt="newsAvatar"/>
                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{(news.datePublished).startOf('ss').fromNow()}</Text>

                </div>
              </a>
            </Card>

          </Col>
        ))}
      </Row>

    </div>
  )
}

export default News