import React, {useState, useContext, useMemo} from 'react';
import { AuthContext } from './AuthProvider';
import useFirestore from '../hooks/useFirestore';

export const AppContext = React.createContext();

export default function AppProvider({children}) {

    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const {user: {uid}} = useContext(AuthContext);
    
    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid]);

    const rooms = useFirestore('rooms', roomsCondition);

    console.log(rooms);

    const selectedRoom = useMemo(() => rooms.find(room => room.id === selectedRoomId) || {}, [rooms, selectedRoomId]);
    //console.log(selectedRoom);

    const usersCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        }
    }, [selectedRoom.members]);

    const members = useFirestore('users', usersCondition);
    const clearState = () => {
        setSelectedRoomId('');
        setIsAddRoomVisible(false);
        setIsInviteMemberVisible(false);
      };
    //console.log({members});
    
    return (
        <AppContext.Provider value={{rooms,
                                    isAddRoomVisible, 
                                    setIsAddRoomVisible, 
                                    selectedRoomId, 
                                    setSelectedRoomId,
                                    selectedRoom,
                                    members,
                                    isInviteMemberVisible,
                                    setIsInviteMemberVisible,
                                    clearState,
        }}>
            {children}
        </AppContext.Provider>
    )
}
