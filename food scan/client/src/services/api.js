import axios from "axios";

const API = "http://localhost:5000/api/scans";
export const getScans = () => axios.get(API);
export const postScan = (data) => axios.post(API, data);