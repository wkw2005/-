//考勤表单组件。
import React, { useState } from 'react';
import axios from 'axios';
import { submitAttendance } from '../services/api';

const getImageDataFromCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                stream.getTracks().forEach(track => track.stop()); // 停止所有视频获取
                resolve(canvas.toBlob());
            };
        });
    } catch (err) {
        console.error('访问摄像机时出错：', err);
        throw new Error('无法访问相机。');
    }
};

const faceRecognition = async (imageData) => {
    try {
        const formData = new FormData();
        formData.append('imageData', imageData);
        const response = await axios.post('/face-recognition', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("人脸识别错误：", error);
        throw error;
    }
};

const AttendanceForm = () => {
    const [attendanceData, setAttendanceData] = useState({
        employeeId: '',
        timestamp: new Date().toISOString(),
        faceRecognitionResult: null,
    });

    const [isFaceRecognitionPending, setIsFaceRecognitionPending] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!attendanceData.employeeId) {
            setError("成员 ID 是必需的。");
            return;
        }
        try {
            await submitAttendance(attendanceData);
            alert('出勤情况已成功提交。');
            setError(null);
        } catch (err) {
            setError("无法提交出勤情况，请稍后再试。");

        }
    };

    const handleFaceRecognition = async () => {
        setIsFaceRecognitionPending(true);
        try {
            const imageData = await getImageDataFromCamera();
            const response = await faceRecognition(imageData);
            setAttendanceData((prevData) => ({
                ...prevData,
                faceRecognitionResult: response.data.result,
            }));
            setIsFaceRecognitionPending(false);
            alert('人脸识别成功： ' + response.data.result);
        } catch (err) {
            setError("面部识别失败，请确保您的摄像头正常工作或稍后再试。");
            setAttendanceData((prevData) => ({
                ...prevData,
                faceRecognitionResult: null,
            }));
            setIsFaceRecognitionPending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Submit Attendance</h1>
            <div>
                <label>Employee ID:</label>
                <input
                    type="text"
                    value={attendanceData.employeeId}
                    onChange={(e) => setAttendanceData({ ...attendanceData, employeeId: e.target.value })}
                />
            </div>
            <button type="button" onClick={handleFaceRecognition}>
                {isFaceRecognitionPending ? 'Recognizing...' : 'Face Recognition'}
            </button>
            <button type="submit">Submit</button>
            {attendanceData.faceRecognitionResult && (
                <div>
                    Face Recognition Result: {attendanceData.faceRecognitionResult}
                </div>
            )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default AttendanceForm;