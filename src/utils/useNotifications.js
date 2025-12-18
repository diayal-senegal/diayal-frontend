import { useState } from 'react';
import { notificationService } from '../api/notifications';
import toast from 'react-hot-toast';

export const useNotifications = () => {
  const [loading, setLoading] = useState(false);

  const sendOrderNotification = async (orderData) => {
    setLoading(true);
    try {
      await notificationService.sendOrderNotification(orderData);
      toast.success('Notification de commande envoyée');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la notification');
    } finally {
      setLoading(false);
    }
  };

  const sendWelcomeNotification = async (userData) => {
    setLoading(true);
    try {
      await notificationService.sendWelcomeNotification(userData);
      toast.success('Email de bienvenue envoyé');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'email de bienvenue');
    } finally {
      setLoading(false);
    }
  };

  const sendOrderStatusNotification = async (statusData) => {
    setLoading(true);
    try {
      await notificationService.sendOrderStatusNotification(statusData);
      toast.success('Notification de statut envoyée');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la notification de statut');
    } finally {
      setLoading(false);
    }
  };

  return {
    sendOrderNotification,
    sendWelcomeNotification,
    sendOrderStatusNotification,
    loading
  };
};