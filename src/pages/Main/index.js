import {useState, useEffect, useRef} from 'react';
import socket from '../../socket';
import ACTIONS from '../../socket/actions';
import {useNavigate} from 'react-router';
import {v4} from 'uuid';
import './style.css';

export default function Main() {
  const navigate = useNavigate();
  const [rooms, updateRooms] = useState([]);
  const rootNode = useRef();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });
  }, []);

  return ( 
    <div ref={rootNode}>
      <h1>Доступные комнаты</h1>

      <ul>
        {rooms.map(roomID => (
          <li className='room-number' key={roomID}>
            {roomID}
            <button className='join' onClick={() => {
              navigate(`/room/${roomID}`);
              
            }}>Присоединиться</button>
          </li>
        ))}
      </ul>

      <button className='create' onClick={() => {
        navigate(`/room/${v4()}`);
      }}>Создать</button>
    </div>
  );

}