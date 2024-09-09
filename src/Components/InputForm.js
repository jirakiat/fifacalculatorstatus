import React from 'react';
import { Form } from 'react-bootstrap';

const InputForm = ({ statusPlayers, onInputChange, inputs }) => {
    return (
        <Form.Group>
            {statusPlayers.map((player, index) => (
                <div key={index}>
                    <Form.Label>{`${player.key} (ตัวคูณ : ${player.value})`}</Form.Label>
                    <Form.Control
                        name={player.key}
                        type="number"
                        value={inputs[player.key] || ''}
                        onChange={onInputChange}
                        placeholder={`${player.key}`}
                    />
                </div>
            ))}
        </Form.Group>
    );
};

export default InputForm;
