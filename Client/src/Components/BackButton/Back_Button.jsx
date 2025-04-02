import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function Back_Button() {

    const navigate = useNavigate();

    return (
        <button
            className="fixed top-27 right-4 flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 z-10"
            onClick={() => navigate(-1)}
        >
            <ArrowBackIcon sx={{ fontSize: 20 }} />
            <span className="text-sm font-medium">Back</span>
        </button>
    )
}

export default Back_Button