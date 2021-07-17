import React, { useContext, useState, useMemo } from 'react';
import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';


function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            })
        }

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions]);

    return (
        <Select 
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {
                // [{label, value, photoURL}]
                options.map(opt => {
                    <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                        <Avatar size="small" src={opt.photoURL}>
                            {opt.photoURL ? '' : opt.label?.charAt(0).toUpperCase()}
                        </Avatar>
                        {`${opt.label}`}
                    </Select.Option>
                })
            }
        </Select>

    )
}

async function fetchUserList(search) {
    return db.collection('users')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => ({
                label: doc.data().displayName,
                value: doc.data().uid,
                photoURL: doc.data().photoURL,
            }))
        });
}


export default function InviteMemberModal() {

    const { isInviteMemberVisible, setIsInviteMemberVisible } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext);
    const [value, setValue] = useState([]);
    //day la useForm trong react hooks
    const [form] = Form.useForm();
    const handleOk = () => {
        //handle logic
        //add new room to firestore

        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });

        //reset form value
        form.resetFields();

        setIsInviteMemberVisible(false);
    }

    const handleCancel = () => {
        //reset form value
        form.resetFields();
        setIsInviteMemberVisible(false);
    }

    return (
        <div>
            <Modal
                title="Thêm thành viên"
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên thành viên"
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{ width: '100%' }}
                    >
                    </DebounceSelect>
                </Form>
            </Modal>
        </div>
    )
}
