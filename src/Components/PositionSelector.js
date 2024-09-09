import React from 'react';
import { Form } from 'react-bootstrap';

const positions = ['ST', 'CF', 'LW/RW', 'CDM', 'CM', 'CAM', 'LM/RM', 'CB', 'LB/RB', 'LWB/RWB', 'GK'];

const PositionSelector = ({ onPositionChange }) => {
    return (
        <Form.Group>
            <Form.Label>Select Position</Form.Label>
            <Form.Control as="select" onChange={onPositionChange}>
                <option value="">Select...</option>
                {positions.map((pos, index) => (
                    <option key={index} value={pos}>{pos}</option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default PositionSelector;
