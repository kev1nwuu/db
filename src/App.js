import React, { Fragment, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap'
import './App.css';

//Components
import CustomerView from './components/CustomerView';
import EmployeeView from './components/EmployeeView';
// import Tabs from './components/Tabs'

function App() {
  const [tabKey, initTabKey] = useState('one')

  const [reloadEmployees, setReloadEmployees] = useState(0);
  function handleReloadEmployees() {
    setReloadEmployees(reloadEmployees + 1);
  }

  return (
    <Fragment>
      <div className='container'>
        <h2 className="mb-3 text-center">Hotel Booking/Management</h2>
        <Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e)}>
          <Tab eventKey="one" title="Customer">
            <CustomerView handleReloadEmployees={handleReloadEmployees}/>
          </Tab>
          <Tab eventKey="two" title="Employee">
            <EmployeeView update={reloadEmployees}/>
          </Tab>
        </Tabs>
      </div>
    </Fragment>
  );
}

export default App;
