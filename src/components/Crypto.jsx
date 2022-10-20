import React, {useState, useEffect} from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../components/API/CryptApi';

function Crypto({simplified}) {
  const count = simplified ? 10 : 50;
  const { data: crypt, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(crypt?.data?.coins);
  const [search, setSearch] = useState('')

  useEffect(() =>{
    const filterdata = crypt?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));
    setCryptos(filterdata)
  }, [search, crypt]);

  if(isFetching === true) return <h3>LOADING</h3>
  return (
    <div>
      <div className='search-crypto'> <Input placeholder='Search crypto' onChange={(e) =>setSearch(e.target.value.toLowerCase())} /></div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((cur) =>(
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={cur.uuid}>
            <Link key={cur.uuid} to={`/crypto/${cur.uuid}`}>
              <Card
                title={`${cur.rank}. ${cur.name}(${cur.symbol})`}
                extra={<img className='crypto-image' src={cur.iconUrl} />}
                hoverable
                >
                  <p>Price: {millify(cur.price)}</p>
                  <p>markeCap: {millify(cur.marketCap)}</p>
                  <p>Change: {millify(cur.change)}%</p>
                
              </Card>

            </Link>


          </Col>

        ))}


      </Row>


    </div>
    
  )
}

export default Crypto