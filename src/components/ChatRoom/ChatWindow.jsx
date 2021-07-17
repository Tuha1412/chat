import React, { useContext, useState } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Avatar, Tooltip, Form, Input, Alert } from 'antd';
import styled from 'styled-components';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import useFirestore from '../../hooks/useFirestore';


const WrapperStyle = styled.div`
    height: 100vh;
`;

const HeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 16px;

    border-bottom: 1px solid rgb(230, 230, 230);
    
    .header{
        &-info{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &-title{
            margin: 0;
            font-weight: bold;
        }
        &-description{
            font-size: 13px;
        }
    }
`;

const ButtonGroupStyle = styled.div`
    display: flex;
    align-items: center;

    .btn-add{
        margin: 10px;
    }
`;

const MessageListStyle = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;

const ContentStyle = styled.div`
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;  
`;

const FormStyle = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgba(230, 230, 230);
    border-radius: 2px;

    .ant-form-item{
        flex: 1;
        margin-bottom: 0;
    }
`;



export default function ChatWindow() {

    const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
    const {user: {uid, photoURL, displayName}} = useContext(AuthContext);
    const [inputValue, setInputValue] = useState('')
    const [form] = Form.useForm();
    const handleInputChange = (e) => {
        setInputValue(e.target.value);

    }
    const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        })

        form.resetFields(['message']);
    }

    const condition = React.useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }), [selectedRoom.id]);

    const messages =  useFirestore('messages', condition);

    return (
        <WrapperStyle>
            {
                selectedRoom.id ? (
                    <>
                        <HeaderStyle>
                            <div className="header-info">
                                <p className="header-title">{selectedRoom.name}</p>
                                <span className="header-description">{selectedRoom.description}</span>
                            </div>
                            <ButtonGroupStyle>
                                <Button onClick={() => setIsInviteMemberVisible(true)} className="btn-add" type="text" icon={<UserAddOutlined />}>Mời</Button>
                                <Avatar.Group size="small" maxCount={2}>
                                    {
                                        members.map(member =>
                                            <Tooltip title={member.displayName} key={member.id}>
                                                <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName?.charAt(0).toUpperCase()}</Avatar>
                                            </Tooltip>)
                                    }
                                </Avatar.Group>
                            </ButtonGroupStyle>
                        </HeaderStyle>
                        <ContentStyle>
                            <MessageListStyle>
                                {
                                    messages.map((message => <Message key={message.id} text={message.text} displayName={message.displayName} photoURL={message.photoURL} createdAt={message.createdAt} />))
                                }
                            </MessageListStyle>
                            <FormStyle form={form}>
                                <Form.Item name="message">
                                    <Input placeholder="Nhập tin nhắn" bordered={false} autoComplete="off" onChange={handleInputChange} onPressEnter={handleOnSubmit} />
                                </Form.Item>
                                <Button type="primary" onClick={handleOnSubmit}>Gửi</Button>
                            </FormStyle>
                        </ContentStyle>
                    </>
                ) : <Alert message="Hãy chọn phòng" type="info" showIcon style={{margin: 5}} closable/>
            }
        </WrapperStyle>
    )
}
