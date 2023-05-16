import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'

console.log(process.env.REACT_APP_API_URL)
const socket = io(process.env.REACT_APP_API_URL)



export default socket
