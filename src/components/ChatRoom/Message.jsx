import { Avatar, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import {formatRelative} from 'date-fns';
const WrapperStyle = styled.div`
    margin-bottom: 10px; 
    
    .author{
        margin-left: 5px;
        font-weight: bold;
    }
    .date{
        margin-left: 10px;
        font-size: 11px;
        color: #a7a7a7;
    }
    .content{
        margin-left: 40px;
    }
`;

function formatDate(seconds) {
    let formattedDate = '';
    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());
        formattedDate = formattedDate.charAt(0).toLocaleUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
}

export default function Message({text, displayName, createdAt, photoURL}) {



    return (
        <WrapperStyle>
            <div>
                <Avatar size="small" src={photoURL}>
                    {photoURL ? '' : displayName.charAt(0)?.toLocaleUpperCase()}
                </Avatar>
                <Typography.Text className="author">{displayName}</Typography.Text>
                <Typography.Text className="date">{formatDate(createdAt?.seconds)}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="content">{text}</Typography.Text>
            </div>
        </WrapperStyle>
    )
}
