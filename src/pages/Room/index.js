import {useParams} from 'react-router';
import useWebRTC, {LOCAL_VIDEO} from '../../hooks/useWebRTC';
import './style.css';
import {  useState } from 'react';


function layout(clientsNumber = 1) {
  const pairs = Array.from({length: clientsNumber})
    .reduce((acc, next, index, arr) => {
      if (index % 2 === 0) {
        acc.push(arr.slice(index, index + 2));
      }
      return acc;
    }, []);

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;
//#region Голосование


//#endregion
  return pairs.map((row, index, arr) => {
    if (index === arr.length - 1 && row.length === 1) {
      return [{
        width: '100%',
        height,
      }];
    }
    return row.map(() => ({
      width: '50%',
      height,
    }));
  }).flat();
}

export default function Room() {
  const {id: roomID} = useParams();
  const {clients, provideMediaRef} = useWebRTC(roomID);
  const videoLayout = layout(clients.length);

  const users = {
    client_1 : clients[0],
    client_2 : clients[1],
    client_3 : clients[2],
    client_4 : clients[3],
    client_5 : clients[4]
  }
     //#region  Модальное окно
     const [roles, setRoles] = useState([
      "Мафия",
      "Доктор",
      "Комиссар",
      "Мирный житель",
    ]);
    const removeRole = (role) => {
      const updatedRoles = roles.filter((r) => r !== role);
      setRoles(updatedRoles);
    };
    const randomRole = () => {
      const index = Math.floor(Math.random() * roles.length);
      const role = roles[index];
      removeRole(role);
      alert(role);
    };
   //#endregion
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      height: '100vh',
    }}>
      {clients.map((clientID, index) => {
        return (
          <div key={clientID} style={videoLayout[index]} id={clientID}>      
            <video
              width='100%'
              height='100%'
              ref={instance => {
                provideMediaRef(clientID, instance);
              }}
              autoPlay
              playsInline
              muted={clientID === LOCAL_VIDEO}
            />
          </div>
        );
      })}
        <div><button className='close-modal' onClick={randomRole} >Кнопка</button></div> 
    </div>
  );
}





