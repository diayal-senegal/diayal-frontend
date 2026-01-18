import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { add_friend, send_message, updateMessage, messageClear } from '../../store/reducers/chatReducer';
import toast from 'react-hot-toast';
import { FaList, FaComments } from 'react-icons/fa'
import io from 'socket.io-client';
import Avatar from '../Avatar';


const socket = io('http://localhost:5000');

const Chat = () => {

    const scrollRef = useRef()

    const dispatch = useDispatch()
    const {sellerId} = useParams()
    const {userInfo } = useSelector(state => state.auth)
    const {fb_messages,currentFd,my_friends,successMessage } = useSelector(state => state.chat)
    const [text,setText] = useState('')
    const [receverMessage,setReceverMessage] = useState('')
    const [activeSeller,setActiveSeller] = useState([])
    const [show, setShow] = useState(false)
    
    // Fonction pour vérifier si un vendeur est en ligne
    const isSellerOnline = (sellerId) => {
        if (!sellerId || !activeSeller || activeSeller.length === 0) return false;
        return activeSeller.some(s => {
            // Vérifier toutes les possibilités
            return s.sellerId === sellerId || 
                   s._id === sellerId || 
                   (s.userInfo && s.userInfo._id === sellerId);
        });
    };
    
    useEffect(() => {
        socket.emit('add_user',userInfo.id, userInfo)
    },[userInfo])

    useEffect(() => {
        dispatch(add_friend({
            sellerId: sellerId || "",
            userId: userInfo.id
        }))
    },[sellerId,userInfo.id,dispatch])

    const send = () => {
        if (text) {
            dispatch(send_message({
                userId: userInfo.id,
                text,
                sellerId,
                name: userInfo.name 
            }))
            setText('')
        }
    }

    useEffect(() => {
        socket.on('seller_message', msg => {
            setReceverMessage(msg)
        })
        socket.on('activeSeller', (sellers) => {
            console.log('Active sellers received:', sellers)
            console.log('Current friend fdId:', currentFd?.fdId)
            console.log('My friends:', my_friends.map(f => ({ name: f.name, fdId: f.fdId })))
            setActiveSeller(sellers)
        })
    },[])

    useEffect(() => {
        if (successMessage) {
            socket.emit('send_customer_message',fb_messages[fb_messages.length - 1])
            dispatch(messageClear())
        }
    },[successMessage,dispatch,fb_messages])

    useEffect(() => {
        if (receverMessage) {
            if (sellerId === receverMessage.senderId && userInfo.id === receverMessage.receverId) {
                dispatch(updateMessage(receverMessage))
            } else {
                toast.success(receverMessage.senderName + " " + "a envoyé un message")
                dispatch(messageClear())
            }
        }

    },[receverMessage,dispatch,sellerId,userInfo.id])
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth'})
    },[fb_messages])

    return (
        <div className='w-full'>
            {/* Header */}
            <div className='flex items-center gap-3 mb-6'>
                <div className='p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg'>
                    <FaComments className='text-xl' />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Chat avec le vendeur</h2>
                    <p className='text-gray-500 text-sm'>Communiquez directement avec vos vendeurs</p>
                </div>
            </div>

            {/* Interface de chat */}
            <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-[600px]'>
                <div className='w-full flex h-full'>
                    
                    {/* Sidebar des contacts */}
                    <div className={`w-[280px] md-lg:absolute md-lg:z-50 bg-white border-r border-gray-200 md-lg:h-full md-lg:shadow-xl transition-all duration-300 ${show ? 'md-lg:left-0' : 'md-lg:-left-[350px]'}`}>
                        <div className='p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100'>
                            <div className='flex items-center gap-3'>
                                <AiOutlineMessage className='text-xl text-blue-600' />
                                <span className='font-semibold text-gray-800'>Conversations</span>
                            </div>
                        </div>
                        
                        <div className='overflow-y-auto h-[calc(100%-60px)]'>
                            {my_friends.length > 0 ? (
                                <div className='p-2'>
                                    {my_friends.map((f, i) => (
                                        <Link 
                                            to={`/dashboard/chat/${f.fdId}`} 
                                            key={i} 
                                            className={`flex gap-3 items-center p-3 rounded-lg mb-2 transition-all duration-200 hover:bg-gray-50 ${
                                                currentFd?.fdId === f.fdId ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                            }`}
                                        >
                                            <Avatar 
                                                type="seller"
                                                image={f.image}
                                                name={f.name}
                                                size="sm"
                                                showOnline={isSellerOnline(f.fdId)}
                                            />
                                            <div className='flex-1 min-w-0'>
                                                <p className='font-medium text-gray-900 truncate'>{f.name}</p>
                                                <p className='text-xs text-gray-500'>
                                                    {isSellerOnline(f.fdId) ? 'En ligne' : 'Hors ligne'}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className='p-6 text-center text-gray-500'>
                                    <AiOutlineMessage className='text-4xl mx-auto mb-2 opacity-50' />
                                    <p className='text-sm'>Aucune conversation</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Zone de chat principale */}
                    <div className='flex-1 flex flex-col'>
                        {currentFd ? (
                            <>
                                {/* Header du chat */}
                                <div className='p-4 border-b border-gray-200 bg-white flex justify-between items-center'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar 
                                            type="seller"
                                            image={currentFd.image}
                                            name={currentFd.name}
                                            size="sm"
                                            showOnline={isSellerOnline(currentFd.fdId)}
                                        />
                                        <div>
                                            <h3 className='font-semibold text-gray-900'>{currentFd.name}</h3>
                                            <p className='text-xs text-gray-500'>
                                                {isSellerOnline(currentFd.fdId) ? 'En ligne' : 'Hors ligne'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => setShow(!show)} 
                                        className='md-lg:flex hidden w-10 h-10 items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200'
                                    >
                                        <FaList />
                                    </button>
                                </div>
                                
                                {/* Zone des messages */}
                                <div className='flex-1 p-4 bg-gray-50 overflow-y-auto'>
                                    <div className='space-y-4'>
                                        {fb_messages.map((m, i) => {
                                            const isMyMessage = currentFd?.fdId === m.receverId;
                                            return (
                                                <div 
                                                    ref={scrollRef} 
                                                    key={i} 
                                                    className={`flex gap-3 ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    {!isMyMessage && (
                                                        <Avatar 
                                                            type="seller"
                                                            image={currentFd?.image}
                                                            name={currentFd?.name}
                                                            size="xs"
                                                        />
                                                    )}
                                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                                                        isMyMessage 
                                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm' 
                                                            : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                                                    }`}>
                                                        <p className='text-sm'>{m.message}</p>
                                                    </div>
                                                    {isMyMessage && (
                                                        <Avatar 
                                                            type="customer"
                                                            image={userInfo?.image}
                                                            name={userInfo?.name}
                                                            size="xs"
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                
                                {/* Zone de saisie */}
                                <div className='p-4 bg-white border-t border-gray-200'>
                                    <div className='flex items-center gap-3'>
                                        <button className='w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200'>
                                            <AiOutlinePlus className='text-xl' />
                                        </button>
                                        
                                        <div className='flex-1 relative'>
                                            <input 
                                                value={text} 
                                                onChange={(e) => setText(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && send()}
                                                type="text" 
                                                placeholder='Tapez votre message...' 
                                                className='w-full px-4 py-3 pr-12 border border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200' 
                                            />
                                            <button className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-200'>
                                                <GrEmoji className='text-lg' />
                                            </button>
                                        </div>
                                        
                                        <button 
                                            onClick={send}
                                            disabled={!text.trim()}
                                            className='w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105'
                                        >
                                            <IoSend className='text-lg' />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* État vide */
                            <div 
                                onClick={() => setShow(true)} 
                                className='flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-gray-50 transition-all duration-300 p-8'
                            >
                                <div className='text-6xl mb-4 animate-bounce'>💬</div>
                                <h3 className='text-xl font-semibold text-gray-700 mb-2'>Sélectionnez une conversation</h3>
                                <p className='text-gray-500 mb-4'>Choisissez un vendeur pour commencer à discuter</p>
                                <button className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105'>
                                    Voir les conversations
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Overlay pour mobile */}
                {show && (
                    <div 
                        className='md-lg:block hidden fixed inset-0 bg-black bg-opacity-50 z-40'
                        onClick={() => setShow(false)}
                    ></div>
                )}
            </div>
        </div>
    );
};

export default Chat;