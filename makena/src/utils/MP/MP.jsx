


import { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const YourComponent = () => {

    const key = "TEST-c5d11e40-96c2-420b-b5ee-9d91ba05b6a8"

    useEffect(() => {
        initMercadoPago('TEST-c5d11e40-96c2-420b-b5ee-9d91ba05b6a8', { locale: 'es-AR' });
    }, []);

    return (
        <div>
            <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} />
        </div>
    );
};

export default YourComponent;



