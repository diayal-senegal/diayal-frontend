@echo off
echo Testing PayDunya API...
curl -X POST http://localhost:5000/api/payment/mobile/initiate ^
  -H "Content-Type: application/json" ^
  -d "{\"orderId\":\"TEST-123\",\"amount\":1000,\"customerName\":\"Test User\",\"provider\":\"orange-money-senegal\",\"phoneNumber\":\"+221771234567\"}"
pause