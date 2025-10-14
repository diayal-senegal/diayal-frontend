import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import error from '../assets/error.png'
import success from '../assets/success.png'
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';

const load = async () => {
    return await loadStripe('pk_test_51S7hTsK3MSlTVRqWi9rfhHclg7spWcAgxa8OBWhV2S8AqvG1BNB5KUZehtTjKv9aQl86BCGrPIgy5gz3himUgJej00kOiGCDmE')
}

const ConfirmOrder = () => {

    const [loader, setLoader] = useState(true)
    const [stripe, setStripe] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        // Vérifier d'abord si c'est un retour Mobile Money (simulation)
        const urlParams = new URLSearchParams(window.location.search)
        const mobileStatus = urlParams.get('status')
        const transactionId = urlParams.get('transaction_id')
        const amount = urlParams.get('amount')
        
        if (mobileStatus && transactionId) {
            if (mobileStatus === 'completed') {
                setMessage('succeeded')
            } else {
                setMessage('failed')
            }
            return
        }
        
        // Vérifier si c'est un retour PayDunya (pour plus tard)
        const token = urlParams.get('token')
        const paydunyaStatus = urlParams.get('status')
        
        if (token && paydunyaStatus) {
            if (paydunyaStatus === 'completed') {
                setMessage('succeeded')
            } else {
                setMessage('failed')
            }
            return
        }
        

        
        // Vérifier aussi le paramètre payment_status (fallback)
        const paymentStatus = urlParams.get('payment_status')
        if (paymentStatus) {
            if (paymentStatus === 'successful') {
                setMessage('succeeded')
            } else {
                setMessage('failed')
            }
            return
        }

        // Sinon, traiter comme un paiement Stripe
        if (!stripe) {
            return
        }
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
        if (!clientSecret) {
            return
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch(paymentIntent.status){
                case "succeeded":
                    setMessage('succeeded')
                    break
                    case "processing":
                    setMessage('processing')
                    break
                    case "requires_payment_method":
                    setMessage('failed')
                    break
                    default:
                    setMessage('failed')

            }
        })
    },[stripe])

    const get_load = async () => {
        const tempStripe = await load()
        setStripe(tempStripe)
    }
    
    useEffect(() => {
        get_load()
    },[])

    const update_payment = async () => {
        const orderId = localStorage.getItem('orderId')
        if (orderId) {
            try {
                await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`)
                localStorage.removeItem('orderId')
                setLoader(false)
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }

    useEffect(() => {
        if (message === 'succeeded') {
            update_payment()
        }
    },[message])


    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            {
                (message === 'failed' || message === 'processing') ? <>
                <img src={error} alt="" />
                <Link className='px-5 py-2 bg-green-500 rounded-md text-white' to="/dashboard/my-orders">Retourner au tableau de bord</Link>
                </> : message === 'succeeded' ? loader ? <FadeLoader/> : <>
                <img src={success} alt="" />
                <Link className='px-5 py-2 bg-green-500 rounded-md text-white' to="/dashboard/my-orders">Retourner au tableau de bord</Link>
                </> : <FadeLoader/> 
            }
            
        </div>
    );
};

export default ConfirmOrder;