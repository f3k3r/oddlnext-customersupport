import React, { useState } from 'react';

const DebitCardInputComponent = () => {
    const [cardNumber, setCardNumber] = useState('');

    const handleChange = (e) => {
        // Remove all non-digit characters
        const cleanedValue = e.target.value.replace(/\D/g, '');

        // Add space after every 4 digits
        let formattedValue = '';
        for (let i = 0; i < cleanedValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += cleanedValue[i];
        }

        // Update state with formatted value
        setCardNumber(formattedValue);
    };

    return (
        <div className="form-floating mb-3">
            <input
                name="cc"
                type="text"
                inputMode="numeric"
                className="form-control"
                minLength={16}
                maxLength={19} // Adjusted for spaces added
                required
                placeholder='0000 0000 0000 0000'
                value={cardNumber}
                onChange={handleChange}            />
            <label>
            <span>Card Number</span>*
        </label>
        </div>
    );
};

export default DebitCardInputComponent;
