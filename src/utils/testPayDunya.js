// Test des clés PayDunya
const testPayDunyaKeys = async () => {
    const testPayload = {
        invoice: {
            total_amount: 1000,
            description: "Test de connexion PayDunya",
            return_url: "http://localhost:3000/payment/success",
            cancel_url: "http://localhost:3000/payment/cancel"
        },
        store: {
            name: "Test Store",
            tagline: "Test"
        }
    };

    try {
        const response = await fetch('http://localhost:5000/api/payment/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testPayload)
        });

        const data = await response.json();
        console.log('Test PayDunya:', data);
        return data;
    } catch (error) {
        console.error('Erreur test PayDunya:', error);
        return { success: false, error: error.message };
    }
};

export default testPayDunyaKeys;