import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ButtonToolbar,
  ButtonGroup
} from 'react-bootstrap';

import {
  getRoutePath
} from 'CommonUtil/CommonUtil.js';

import SortedTable from 'SortedTable/SortedTable.js';

const mockedData = [
  {id: 5, name: 'name1', family: 'family5', city: 'city5', score: 500},
  {id: 2, name: 'name1', family: 'family2', city: 'city5', score: 300},
  {id: 1, name: 'name1', family: 'family2', city: 'city1', score: 200},
  {id: 3, name: 'name3', family: 'family3', city: 'city3', score: 100},
  {id: 4, name: 'name1', family: 'family2', city: 'city5', score: 400}
];

export class Dashboard extends React.Component {
  componentDidMount() {
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <ButtonToolbar>
          <ButtonGroup>
            <Button onClick={() => this.context.router.push(getRoutePath('sample')) } >Go to sample page</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <p style={{marginTop:32}}>Place your sample below this line (Dashboard/Dashboard.js):</p>
        <hr style={{border: '1px solid black'}} />
        <SortedTable data={mockedData}/>
      </div>
    );
  }
}

// latest way to dispatch
Dashboard.contextTypes = {
  // @see https://github.com/grommet/grommet/issues/441
  router: React.PropTypes.object.isRequired
};

export default connect(
  function (storeState) {
    // store state to props
    return {
    };
  }
)(Dashboard);