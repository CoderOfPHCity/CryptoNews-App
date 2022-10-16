import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
// import { Exchange, Home, News, Crypto, Cryptodetail, Navbar } from './components';
import Navbar from './components/Navbar'
import Exchange from './components/Exchange'
import Home from './components/Home'
import News from './components/News'
import Crypto from './components/Crypto'
import Cryptodetail from './components/Cryptodetail'

import './App.css'


function App() {
  return (
    <>
    <div>
      <Router>
      <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/exchange' element={< Exchange />}></Route>
          <Route exact path='/crypto' element={< Crypto />}></Route>
          <Route exact path='//crypto/:coinId' element={< Cryptodetail />}></Route>
          <Route exact path='/news' element={< News />}></Route>
          </Routes>
        </div>
      </Layout>

      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2021
          <Link to="/">
            Cryptoverse Inc.
          </Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
      </div>
    </div>
  </div>
  </Router>
    </div>
    </>
  )
}

export default App






