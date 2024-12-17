import { toDataURL } from 'qrcode';

const generateQrCode = (address: string) => {
  const qr = toDataURL(address, { type: 'image/webp' });

  return qr;
};

export default generateQrCode;
