import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { resetSuccessAction } from '../../redux/slices/globalSlice.js/globalSlice'

const SuccessMsg = ({message}) => {
 
    const dispatch = useDispatch()
    Swal.fire({
        icon: 'success',
        title:'Good Job',
        text: message
    })
    dispatch(resetSuccessAction())
}

export default SuccessMsg