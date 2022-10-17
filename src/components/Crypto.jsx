import React, {useState} from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../components/API/CryptApi';



function Crypto({simplified}) {
  const show = simplified ? 10 : 50;
  const { data: crypt, isFetching } = useGetCryptosQuery(show);
  const [cryptos, setCryptos] = useState(crypt?.data?.coins);

  if(isFetching === true) return <h3>LOADING</h3>
 



  return (
<<<<<<< HEAD
    <div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((cur) =>(
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={cur.id}>
            <Link to={`/crypto/${cur.id}`}>
              <Card
                title={`${cur.rank}. ${cur.name}(${cur.symbol})`}
                extra={<img className='crypto-image' src={cur.iconUrl} />}
                hoverable
                >
                  <p>Price: {millify(cur.price)}</p>
                  <p>markeCap: {millify(cur.marketCap)}</p>
                  <p>Change: {millify(cur.change)}</p>
                
              </Card>

            </Link>


          </Col>

        ))}


      </Row>


    </div>
=======
    <div>rypto</div>
>>>>>>> ab3c46a3e05ff5817a3fcaa48d5cdd83acce10da
  )
}

export default Crypto