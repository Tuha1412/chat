import React, { useContext } from 'react';
import { Collapse, Typography, Button } from 'antd';
import styled from 'styled-components';
import {PlusSquareOutlined} from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';
const {Panel} = Collapse;

const PanelStyle = styled(Panel)`
    &&& {
        .ant-collapse-header, p{
            color: white
        }
        .ant-collapse-content-box{
            padding: 0 40px;
        }
        .add-room{
            color: white;
            padding: 0;
        }
    }
`;

const LinkStyle = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`;

export default function RoomList() {

    const {rooms, setIsAddRoomVisible, setSelectedRoomId} = useContext(AppContext);

    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    }


    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyle  header="Danh sách các phòng" key="1">
                {
                    rooms.map(room => {
                        return <LinkStyle onClick={() => setSelectedRoomId(room.id)}  key={room.id}>{room.name}</LinkStyle>
                    })
                }
                <Button type="text" onClick={handleAddRoom} icon={<PlusSquareOutlined />} className="add-room">Thêm phòng</Button>
            </PanelStyle>
        </Collapse>
    )
}
