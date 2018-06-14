import React from 'react';

import {Row, Col, Icon} from 'antd';

import UserProfile from './UserProfile.js';

const DoctorProfile = props => {

    const user = JSON.parse(localStorage.getItem('user'));
    const { doctor_profile } = user;
    return (
        <div>
            
            <Row>
                <Col span={18} push={6}>
                    <h3>{doctor_profile.qualification}</h3>
                    <h3>
                        <Icon type="star" /> {doctor_profile.exp || 0}
                    </h3>
                    <p>Hospital: {doctor_profile.hospital}</p>
                    <p>{doctor_profile.description}</p>
                    <ul>
                        {/*
                            {doctor_profile.speciality.map(sp => <li key={sp}>{sp}</li>)}
                        */}
                    </ul>
                </Col>
                <Col span={6} pull={18}>
                    <UserProfile />
                </Col>
            </Row>
        </div>
    );
};

export default DoctorProfile;
