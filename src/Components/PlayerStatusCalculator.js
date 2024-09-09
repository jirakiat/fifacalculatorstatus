import React, {useState} from 'react';
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap';
import InputForm from './InputForm';
import ResultDisplay from './ResultDisplay';
import './PlayerStatusCalculator.css'; // Import custom CSS

// สีของ Card ตาม Material Design
const positionColors = {
    ST: '#E57373', // สีแดงอ่อนสำหรับกองหน้า
    CF: '#F06292', // สีชมพูสำหรับกองหน้า
    'LW/RW': '#BA68C8', // สีม่วงสำหรับปีก
    CDM: '#81C784', // สีเขียวอ่อนสำหรับกองกลางตัวรับ
    CM: '#4DB6AC', // สีเขียวฟ้าน้ำสำหรับกองกลาง
    CAM: '#64B5F6', // สีฟ้าสำหรับกองกลางตัวรุก
    'LM/RM': '#4FC3F7', // สีฟ้าอ่อนสำหรับปีก
    CB: '#7986CB', // สีม่วงน้ำเงินสำหรับกองหลังตัวกลาง
    'LB/RB': '#FFB74D', // สีส้มอ่อนสำหรับฟูลแบ็ค
    GK: '#FFD54F', // สีเหลืองอ่อนสำหรับผู้รักษาประตู
};

// ข้อมูลสถานะของผู้เล่นตามตำแหน่ง (ว่างเปล่า)
const dataset = [{"key": "จบสกอร์", "value": 18, "position": "ST"}, {
    "key": "ยืนตำแหน่ง",
    "value": 13,
    "position": "ST"
}, {"key": "ควบคุมบอล", "value": 10, "position": "ST"}, {
    "key": "พลังการยิง",
    "value": 10,
    "position": "ST"
}, {"key": "โหม่งบอล", "value": 10, "position": "ST"}, {
    "key": "ปฏิกิริยา",
    "value": 8,
    "position": "ST"
}, {"key": "เลี้ยงบอล", "value": 7, "position": "ST"}, {
    "key": "แข็งแกร่ง",
    "value": 5,
    "position": "ST"
}, {"key": "ความเร็ว", "value": 5, "position": "ST"}, {
    "key": "ส่งสั้น",
    "value": 5,
    "position": "ST"
}, {"key": "สปีดต้น", "value": 4, "position": "ST"}, {"key": "ยิงไกล", "value": 3, "position": "ST"}, {
    "key": "วอลเล่",
    "value": 2,
    "position": "ST"
}, {"key": "ควบคุมบอล", "value": 15, "position": "CF"}, {
    "key": "เลี้ยงบอล",
    "value": 14,
    "position": "CF"
}, {"key": "ยืนตำแหน่ง", "value": 13, "position": "CF"}, {
    "key": "จบสกอร์",
    "value": 11,
    "position": "CF"
}, {"key": "ปฏิกิริยา", "value": 9, "position": "CF"}, {
    "key": "ส่งสั้น",
    "value": 9,
    "position": "CF"
}, {"key": "อ่านเกมส์", "value": 8, "position": "CF"}, {
    "key": "พลังการยิง",
    "value": 5,
    "position": "CF"
}, {"key": "ความเร็ว", "value": 5, "position": "CF"}, {
    "key": "สปีดต้น",
    "value": 5,
    "position": "CF"
}, {"key": "ยิงไกล", "value": 4, "position": "CF"}, {
    "key": "โหม่งบอล",
    "value": 2,
    "position": "CF"
}, {"key": "เลี้ยงบอล", "value": 16, "position": "LW/RW"}, {
    "key": "ควบคุมบอล",
    "value": 14,
    "position": "LW/RW"
}, {"key": "จบสกอร์", "value": 10, "position": "LW/RW"}, {
    "key": "ยืนตำแหน่ง",
    "value": 9,
    "position": "LW/RW"
}, {"key": "ส่งสั้น", "value": 9, "position": "LW/RW"}, {
    "key": "เปิดบอล",
    "value": 9,
    "position": "LW/RW"
}, {"key": "ปฏิกิริยา", "value": 7, "position": "LW/RW"}, {
    "key": "สปีดต้น",
    "value": 7,
    "position": "LW/RW"
}, {"key": "อ่านเกมส์", "value": 6, "position": "LW/RW"}, {
    "key": "ความเร็ว",
    "value": 6,
    "position": "LW/RW"
}, {"key": "ยิงไกล", "value": 4, "position": "LW/RW"}, {
    "key": "คล่องตัว",
    "value": 3,
    "position": "LW/RW"
}, {"key": "ส่งสั้น", "value": 14, "position": "CDM"}, {
    "key": "เข้้าสกัด",
    "value": 14,
    "position": "CDM"
}, {"key": "เข้าปะทะ", "value": 12, "position": "CDM"}, {
    "key": "ควบคุมบอล",
    "value": 10,
    "position": "CDM"
}, {"key": "ส่งไกล", "value": 10, "position": "CDM"}, {
    "key": "ประกบตัว",
    "value": 9,
    "position": "CDM"
}, {"key": "ปฏิกิริยา", "value": 7, "position": "CDM"}, {
    "key": "ความอึด",
    "value": 6,
    "position": "CDM"
}, {"key": "สไลด์", "value": 5, "position": "CDM"}, {"key": "ดุดัน", "value": 5, "position": "CDM"}, {
    "key": "อ่านเกม",
    "value": 4,
    "position": "CDM"
}, {"key": "แข็งแกร่ง", "value": 4, "position": "CDM"}, {
    "key": "ส่งสั้น",
    "value": 17,
    "position": "CM"
}, {"key": "ควบคุมบอล", "value": 14, "position": "CM"}, {
    "key": "อ่านเกมส์",
    "value": 13,
    "position": "CM"
}, {"key": "ส่งไกล", "value": 13, "position": "CM"}, {
    "key": "ปฏิกิริยา",
    "value": 8,
    "position": "CM"
}, {"key": "เลี้ยงบอล", "value": 7, "position": "CM"}, {
    "key": "ยืิืนตำแหน่ง",
    "value": 6,
    "position": "CM"
}, {"key": "ความอึด", "value": 6, "position": "CM"}, {
    "key": "เข้าปะทะ",
    "value": 5,
    "position": "CM"
}, {"key": "เข้้าสกัด", "value": 5, "position": "CM"}, {
    "key": "ยืิิงไกล",
    "value": 4,
    "position": "CM"
}, {"key": "จบสกอ", "value": 2, "position": "CM"}, {
    "key": "ส่งสั้น",
    "value": 16,
    "position": "CAM"
}, {"key": "ควบคุมบอล", "value": 15, "position": "CAM"}, {
    "key": "อ่านเกมส์",
    "value": 14,
    "position": "CAM"
}, {"key": "เลี้ยงบอล", "value": 13, "position": "CAM"}, {
    "key": "ยืนตำแหน่ง",
    "value": 9,
    "position": "CAM"
}, {"key": "ปฏิกิริยา", "value": 7, "position": "CAM"}, {
    "key": "จบสกอ",
    "value": 7,
    "position": "CAM"
}, {"key": "ยืิงไกล", "value": 5, "position": "CAM"}, {
    "key": "ส่ปีดต้น",
    "value": 4,
    "position": "CAM"
}, {"key": "ส่งไกล", "value": 4, "position": "CAM"}, {
    "key": "ความเร็ว",
    "value": 3,
    "position": "CAM"
}, {"key": "คล่องตัว", "value": 3, "position": "CAM"}, {
    "key": "เลี้ยงบอล",
    "value": 15,
    "position": "LM/RM"
}, {"key": "ควบคุมบอล", "value": 13, "position": "LM/RM"}, {
    "key": "ส่งสั้น",
    "value": 11,
    "position": "LM/RM"
}, {"key": "เปิดบอล", "value": 10, "position": "LM/RM"}, {
    "key": "ยืนตำแหน่ง",
    "value": 8,
    "position": "LM/RM"
}, {"key": "ปฏิกิริยา", "value": 7, "position": "LM/RM"}, {
    "key": "สปีดต้น",
    "value": 7,
    "position": "LM/RM"
}, {"key": "อ่านเกม", "value": 7, "position": "LM/RM"}, {
    "key": "จบสกอร์",
    "value": 6,
    "position": "LM/RM"
}, {"key": "ความเร็ว", "value": 6, "position": "LM/RM"}, {
    "key": "ความอึด",
    "value": 5,
    "position": "LM/RM"
}, {"key": "ส่งไกล", "value": 5, "position": "LM/RM"}, {
    "key": "ประกบตัว",
    "value": 17,
    "position": "CB"
}, {"key": "เข้าสกัด", "value": 14, "position": "CB"}, {
    "key": "เข้าปะทะ",
    "value": 13,
    "position": "CB"
}, {"key": "สไลด์", "value": 10, "position": "CB"}, {
    "key": "โหม่งบอล",
    "value": 10,
    "position": "CB"
}, {"key": "แข็งแกร่ง", "value": 10, "position": "CB"}, {
    "key": "ดุดัน",
    "value": 7,
    "position": "CB"
}, {"key": "ปฏิกิริยา", "value": 5, "position": "CB"}, {
    "key": "ส่งสั้น",
    "value": 5,
    "position": "CB"
}, {"key": "ควบคุมบอล", "value": 4, "position": "CB"}, {
    "key": "กระโดด",
    "value": 3,
    "position": "CB"
}, {"key": "ความเร็ว", "value": 2, "position": "CB"}, {
    "key": "สไลด์",
    "value": 14,
    "position": "LB/RB"
}, {"key": "เข้าสกัด", "value": 12, "position": "LB/RB"}, {
    "key": "เข้าปะทะ",
    "value": 11,
    "position": "LB/RB"
}, {"key": "เปิดบอล", "value": 9, "position": "LB/RB"}, {
    "key": "ความอึด",
    "value": 8,
    "position": "LB/RB"
}, {"key": "ปฏิกิริยา", "value": 8, "position": "LB/RB"}, {
    "key": "ประกบตัว",
    "value": 8,
    "position": "LB/RB"
}, {"key": "ส่งสั้น", "value": 7, "position": "LB/RB"}, {
    "key": "ควบคุมบอล",
    "value": 7,
    "position": "LB/RB"
}, {"key": "ความเร็ว", "value": 7, "position": "LB/RB"}, {
    "key": "สปีดต้น",
    "value": 5,
    "position": "LB/RB"
}, {"key": "โหม่งบอล", "value": 4, "position": "LB/RB"}, {
    "key": "เข้าสกัด",
    "value": 12,
    "position": "LWB/RWB"
}, {"key": "เปิดบอล", "value": 12, "position": "LWB/RWB"}, {
    "key": "สไลด์",
    "value": 11,
    "position": "LWB/RWB"
}, {"key": "ส่งสั้น", "value": 10, "position": "LWB/RWB"}, {
    "key": "ความอึด",
    "value": 10,
    "position": "LWB/RWB"
}, {"key": "เข้าปะทะ", "value": 8, "position": "LWB/RWB"}, {
    "key": "ควบคุมบอล",
    "value": 8,
    "position": "LWB/RWB"
}, {"key": "ปฏิกิริยา", "value": 8, "position": "LWB/RWB"}, {
    "key": "ประกบตัว",
    "value": 7,
    "position": "LWB/RWB"
}, {"key": "ความเร็ว", "value": 6, "position": "LWB/RWB"}, {
    "key": "เลี้ยงบอล",
    "value": 4,
    "position": "LWB/RWB"
}, {"key": "สปีดต้น", "value": 4, "position": "LWB/RWB"}, {
    "key": "พุ่งรับ",
    "value": 21,
    "position": "GK"
}, {"key": "รับบอล", "value": 21, "position": "GK"}, {
    "key": "ยืนตำแหน่ง",
    "value": 21,
    "position": "GK"
}, {"key": "GK ปฏิกิริยา", "value": 21, "position": "GK"}, {
    "key": "ปฏิกิริยา",
    "value": 11,
    "position": "GK"
}, {"key": "ส่งบอล", "value": 5, "position": "GK"}];

function PlayerStatusCalculator() {
    const [selectedPosition, setSelectedPosition] = useState('');
    const [inputs, setInputs] = useState({});
    const [calculatedValue, setCalculatedValue] = useState(0);

    // ฟังก์ชันการจัดการเมื่อผู้ใช้เลือกตำแหน่ง
    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
        setInputs({});  // เคลียร์ค่าฟอร์มเมื่อมีการเลือกตำแหน่งใหม่
    };

    // ฟังก์ชันการจัดการเมื่อผู้ใช้กรอกข้อมูลในฟอร์ม
    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    // ฟังก์ชันการคำนวณผลลัพธ์
    const calculateStatus = () => {
        let total = 0;
        dataset.filter(player => player.position === selectedPosition).forEach(player => {
            total += (inputs[player.key] ? parseFloat(inputs[player.key]) : 0) * player.value;
        });
        setCalculatedValue(total / 100);
    };

    // กรองข้อมูลสถานะของผู้เล่นที่ตรงกับตำแหน่งที่เลือก
    const filteredPlayers = dataset.filter(player => player.position === selectedPosition);

    return (
        <Container fluid style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px', fontFamily: 'Kanit, sans-serif' }}>
            <Row className="mb-3 justify-content-center">
                {/* แสดงผลลัพธ์ด้านบนในรูปแบบ Scoreboard */}
                <Col md={6}>
                    <ResultDisplay calculatedValue={calculatedValue} />
                </Col>
            </Row>

            <Row>
                {/* Box Panel สำหรับเลือกตำแหน่ง */}
                <Col md={4}>
                    <div className="box-shadow-container">
                        <h5 className="mb-3">เลือกตำแหน่ง</h5>
                        <div className="mb-4">
                            <h6>กองหน้า (Forwards)</h6>
                            {['ST', 'CF'].map((position) => (
                                <Card
                                    key={position}
                                    onClick={() => handlePositionSelect(position)}
                                    className="mb-3"
                                    style={{ backgroundColor: positionColors[position], color: 'white', cursor: 'pointer' }}
                                >
                                    <Card.Body>
                                        <Card.Title>{position}</Card.Title>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                        <div className="mb-4">
                            <h6>ปีก (Wingers)</h6>
                            {['LW/RW', 'LM/RM'].map((position) => (
                                <Card
                                    key={position}
                                    onClick={() => handlePositionSelect(position)}
                                    className="mb-3"
                                    style={{ backgroundColor: positionColors[position], color: 'white', cursor: 'pointer' }}
                                >
                                    <Card.Body>
                                        <Card.Title>{position}</Card.Title>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                        <div className="mb-4">
                            <h6>กองกลาง (Midfielders)</h6>
                            {['CDM', 'CM', 'CAM'].map((position) => (
                                <Card
                                    key={position}
                                    onClick={() => handlePositionSelect(position)}
                                    className="mb-3"
                                    style={{ backgroundColor: positionColors[position], color: 'white', cursor: 'pointer' }}
                                >
                                    <Card.Body>
                                        <Card.Title>{position}</Card.Title>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                        <div className="mb-4">
                            <h6>กองหลัง (Defenders)</h6>
                            {['CB', 'LB/RB'].map((position) => (
                                <Card
                                    key={position}
                                    onClick={() => handlePositionSelect(position)}
                                    className="mb-3"
                                    style={{ backgroundColor: positionColors[position], color: 'white', cursor: 'pointer' }}
                                >
                                    <Card.Body>
                                        <Card.Title>{position}</Card.Title>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                        <div className="mb-4">
                            <h6>ผู้รักษาประตู (Goalkeeper)</h6>
                            <Card
                                key={'GK'}
                                onClick={() => handlePositionSelect('GK')}
                                className="mb-3"
                                style={{ backgroundColor: positionColors['GK'], color: 'white', cursor: 'pointer' }}
                            >
                                <Card.Body>
                                    <Card.Title>GK</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Col>

                {/* Box Panel สำหรับกรอกข้อมูลตำแหน่ง */}
                <Col md={8}>
                    <div className="box-shadow-container">
                        <h5>กรอกข้อมูลตำแหน่ง: {selectedPosition}</h5>
                        {selectedPosition && (
                            <Form>
                                <InputForm statusPlayers={filteredPlayers} onInputChange={handleInputChange} inputs={inputs} />
                                <Button onClick={calculateStatus} className="mt-3">คำนวนค่าสเตตัสนักเตะ</Button>
                            </Form>
                        )}
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="text-center">
                    <div className="footer">
                        <p>© Dev by [ Jiw Jirakiat ]</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default PlayerStatusCalculator;
