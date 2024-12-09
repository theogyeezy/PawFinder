import { functions } from '../lib/firebase';
import { httpsCallable } from 'firebase/functions';

interface WelcomeEmailData {
  to: string;
  name: string;
  dogName: string;
  qrCodeUrl: string;
}

interface EmailService {
  sendWelcomeEmail: (data: WelcomeEmailData) => Promise<void>;
}

class FirebaseEmailService implements EmailService {
  async sendWelcomeEmail(data: WelcomeEmailData): Promise<void> {
    const sendWelcomeEmail = httpsCallable(functions, 'sendWelcomeEmail');
    await sendWelcomeEmail(data);
  }
}

export const emailService = new FirebaseEmailService();