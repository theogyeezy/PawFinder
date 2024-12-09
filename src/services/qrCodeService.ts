import QRCode from 'qrcode';

export const generateQRCode = async (dogId: string): Promise<string> => {
  const baseUrl = window.location.origin;
  const qrUrl = `${baseUrl}/dog/${dogId}`;
  
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(qrUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

export const validateQRCode = (qrData: string): boolean => {
  try {
    const url = new URL(qrData);
    return url.pathname.startsWith('/dog/');
  } catch {
    return false;
  }
};