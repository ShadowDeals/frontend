import { useEffect, useState } from 'react';
import axios from 'axios';
import {API_BASE} from "../baseUrl.js";

const useRegions = () => {
    const [regionsBandExist, setRegionsBandExist] = useState([]);
    const [regionsBandNotExist, setRegionsBandNotExist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const [existRes, notExistRes] = await Promise.all([
                    axios.get(`${API_BASE}/api/region?isBandExist=true`),
                    axios.get(`${API_BASE}/api/region?isBandExist=false`)
                ]);
                setRegionsBandExist(existRes.data);
                setRegionsBandNotExist(notExistRes.data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRegions();
    }, []);

    return { regionsBandExist, regionsBandNotExist, loading, error };
};

export default useRegions;
