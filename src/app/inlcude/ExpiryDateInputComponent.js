import React, { useState } from 'react';

const ExpiryDateInputComponent = () => {
    const [expiryDate, setExpiryDate] = useState('');

    const formatExpiryDate = (value) => {
        // Remove all non-digit characters
        const cleanValue = value.replace(/\D+/g, '');

        // Format the cleaned value
        const formattedValue = cleanValue.replace(
            /^(\d{2})(\d{0,2}).*/,
            (_, p1, p2) => [p1, p2].filter(Boolean).join('/')
        );

        setExpiryDate(formattedValue);
    };

    const handleChange = (e) => {
        formatExpiryDate(e.target.value);
    };

    return (
        <div className="form-floating mb-3">
            <input
                id="expiryDate"
                name="expiryDate"
                type="text"
                placeholder='MM/YY'
                className="form-control"
                required
                inputMode='numeric'
                aria-label="Expiry Date"
                value={expiryDate}
                onChange={handleChange}
            />
            <label className='' htmlFor="expiryDate">Expiry Date* </label>
        </div>
    );
};

export default ExpiryDateInputComponent;