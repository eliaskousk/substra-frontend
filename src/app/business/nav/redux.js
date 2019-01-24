import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import {getRoutes, getOrders} from './selector';
import Nav from './components';
import withInjectedReducers from '../common/components/withInjectedReducers';
import algoActions from '../routes/algo/actions';
import challengeActions from '../routes/challenge/actions';
import datasetActions from '../routes/dataset/actions';
import modelActions from '../routes/model/actions';

const mapStateToProps = state => ({
        routes: getRoutes(state),
        location: state.location,
        orders: getOrders(state),
    });

const mapDispatchToProps = dispatch => ({
    unselect: bindActionCreators({
        algorithm: algoActions.list.unselect,
        challenge: challengeActions.list.unselect,
        dataset: datasetActions.list.unselect,
        model: modelActions.list.unselect,
    }, dispatch),
});

// injected reducer have been loaded from search component, no need to inject them a second time
// however, we need to make this component aware about he injected reducers
export default withInjectedReducers(connect(mapStateToProps, mapDispatchToProps)(Nav));
