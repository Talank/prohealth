import React from 'react';

import {Link} from 'react-router-dom';
import {Card} from 'antd';
import AppointmentForm from './AppointmentForm';
import PrescriptionForm from './PrescriptionForm';
import Prescription from './Prescription';
import Appointment from './Appointment';
import Actions from './Actions';
import {getPescription, deleteMedicine} from '../../actions/queryActions';

const is_doctor = true;
class QueryCta extends React.Component {
    state = {
        prescription: null,
        loading: false,
    };
    updatePescription = () => {
        this.setState({loading: true});
        getPescription(this.props.id)
            .then(data => {
                if (data) {
                    this.setState({prescription: data});
                    setTimeout(() => {
                        this.setState({loading: false});
                    }, 1000);
                }
            })
            .catch(e => {
                return;
            });
    };

    componentDidMount() {
        this.updatePescription();
    }
    render() {
        return (
            <div style={{height: '80vh', overflowY: 'scroll'}}>
                {!is_doctor && <Actions {...this.props} />}
                <Prescription
                    {...this.props}
                    prescription={this.state.prescription}
                    updatePescription={this.updatePescription}
                    id={this.props.id}
                />
                {is_doctor && (
                    <PrescriptionForm
                        {...this.props}
                        prescription={this.state.prescription}
                        updatePescription={this.updatePescription}
                        id={this.props.id}
                    />
                )}
                <Appointment {...this.props} id={this.props.id} />
            </div>
        );
    }
}
export default QueryCta;
