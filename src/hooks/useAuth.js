import { useSelector } from 'react-redux';
import TokenStorage from '../API/TokenStorage';

export default function useAuth() {
    const accessToken = useSelector((state) => state.userData.accessToken);
    return !!accessToken || !!TokenStorage.getAccessToken();
}