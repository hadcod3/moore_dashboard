'use client'
import React, { useEffect, useState } from 'react';

const CurrentDateTime: React.FC = () => {
    const [currentDateTime, setCurrentDateTime] = useState<string>('');

    const formatDateTime = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // Convert hour '0' to '12'
        const formattedHours = String(hours).padStart(2, '0');

        return `${day} - ${month} - ${year} | ${formattedHours}:${minutes}:${seconds} ${ampm}`;
    };

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentDateTime(formatDateTime(now));
        };

        // Set initial date and time
        updateDateTime();

        // Update every second
        const intervalId = setInterval(updateDateTime, 500);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <p>{currentDateTime}</p>
    );
};

export default CurrentDateTime;
