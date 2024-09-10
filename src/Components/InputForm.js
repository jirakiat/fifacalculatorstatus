import React from 'react';
import { Form } from 'react-bootstrap';

const InputForm = ({ statusPlayers, onInputChange, inputs }) => {
    return (
        <Form.Group>
            {statusPlayers.map((player, index) => (
                <div key={index} className="input-row">
                    <Form.Label className="input-label">{`${player.key} (ตัวคูณ: ${player.value})`}</Form.Label>
                    <div className="input-wrapper">
                        <Form.Control
                            name={player.key}
                            type="number"
                            value={inputs[player.key] || ''}
                            onChange={onInputChange}
                            placeholder={`กรอกค่า ${player.key}`}
                            className="input-box"
                        />
                        <Form.Control
                            name={`TC_${player.key}`}
                            type="number"
                            value={inputs[`TC_${player.key}`] || ''}
                            onChange={onInputChange}
                            placeholder="อัพคะแนน TC"
                            max={2}
                            className="tc-box"
                        />
                    </div>
                </div>
            ))}
        </Form.Group>
    );
};

export default InputForm;
