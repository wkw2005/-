//面部识别组件（预留接口）
import React from 'react';
import { getImageDataFromCamera } from './AttendanceForm'; 
import { faceRecognition as faceRecognitionService } from '../services/api'; 

const FaceRecognition = ({ onRecognize }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleRecognition = async () => {
        setIsLoading(true);
        setError('');
        try {
            const imageData = await getImageDataFromCamera(); 
            const response = await faceRecognitionService(imageData);
            onRecognize(response.data.result); 
            setIsLoading(false);
        } catch (error) {
            console.error("面部识别失败", error);
            setError("面部识别失败，请确保您的摄像头正常工作或稍后再试。");
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleRecognition} disabled={isLoading}>
                {isLoading ? '识别中...' : '开始面部识别'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default FaceRecognition;