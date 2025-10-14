import React, { useState } from 'react';
import testPayDunyaKeys from '../utils/testPayDunya';

const TestPayDunya = () => {
    const [testResult, setTestResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTest = async () => {
        setIsLoading(true);
        const result = await testPayDunyaKeys();
        setTestResult(result);
        setIsLoading(false);
    };

    return (
        <div className="p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-bold mb-4">🧪 Test PayDunya</h3>
            
            <button 
                onClick={handleTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {isLoading ? 'Test en cours...' : 'Tester les clés PayDunya'}
            </button>

            {testResult && (
                <div className={`mt-4 p-3 rounded ${testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <h4 className="font-bold">Résultat du test :</h4>
                    <pre className="text-sm mt-2 overflow-auto">
                        {JSON.stringify(testResult, null, 2)}
                    </pre>
                </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
                <p><strong>Clés utilisées :</strong></p>
                <p>Public Key: test_public_PmPryCuut290ewlppSLt0nrEWj6</p>
                <p>Mode: sandbox</p>
            </div>
        </div>
    );
};

export default TestPayDunya;