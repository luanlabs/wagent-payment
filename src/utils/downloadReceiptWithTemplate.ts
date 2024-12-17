import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { StatusType } from '../models';
import humanizeAmount from './humanizeAmount';

interface IReception {
  orderId: string;
  amount: string;
  hash: string;
  token: string;
  network: string;
  date: string;
  status: StatusType;
}

const downloadReceiptWithTemplate = async ({
  orderId,
  amount,
  hash,
  token,
  network,
  date,
  status,
}: IReception) => {
  const container = document.createElement('div');
  container.style.width = '794px';
  container.style.height = '1123px';
  container.style.backgroundColor = '#f4f4f4';
  container.style.padding = '20px';

  const info = document.createElement('div');
  info.style.position = 'relative';
  info.style.width = '100%';
  info.style.height = '100%';
  info.style.margin = '0 auto';
  info.innerHTML = /*html*/ `
    <div style="font-family: Aeonik, sans-serif; background-color: #ffffff; border-radius: 15px; padding: 20px;">
      <!-- Header Section -->
      <div style="text-align: center; margin-bottom: 20px; width: 100%">
        <img 
          src="../../../public/images/logoTypeDark.svg" 
          style="width: 147px; height: 29px; margin: auto;" 
          alt="Wagent Logo" 
          crossorigin="anonymous"
        />
      </div>
      <div style="text-align: center; display: flex; flex-direction: column; justify-content:center; align-items:center; background-color: #073834; color: white; height:auto; padding-top: 10px; padding-bottom:20px; border-radius: 10px;">
        <h2 style="margin: 0;">Payment Receipt</h2>
        <p style="margin: 0; font-size: 14px;">Transaction Confirmation</p>
      </div>

      <!-- Body Section -->
      <div style="margin-top: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
        <p>The Payment was successful,</p>
        <p>Thank you for using our payment gateway. Below are the details of your recent transaction:</p>
        <div style="margin-top: 20px; border: 1px solid #e5e5e5; padding: 15px; border-radius: 10px; background-color: #f9f9f9;">
          <p><strong>Payment ID:</strong>#${orderId}</p>
          <p><strong>TX hash:</strong> <a
          href=${`https://stellar.expert/explorer/testnet/tx/${hash}`}
          target="_blank"
          style="color: #3A21D4"
        >
          ${hash}
        </a></p>
          <p><strong>Amount:</strong> ${humanizeAmount(amount)} ${token.toUpperCase()}</p>
          <p><strong>Network:</strong> ${network}</p>
          <p><strong>Status:</strong> ${status}</p>
          <p><strong>Date:</strong> ${date}</p>
        </div>
      </div>

      <!-- Footer Section -->
      <div style="margin-top: 40px; text-align: center; font-size: 14px; color: #777777;">
        <p>If you have any questions about your payment, please contact our support team.</p>
        <div style="margin-top: 20px;">
          <a href="https://x.com/wagent" style="margin-right: 10px;">
            <img src="https://static.wagent.app/icons/x.png" alt="Twitter" style="width: 20px; height: 20px;">
          </a>
          <a href="https://github.com/luanlabs" style="margin-right: 10px;">
            <img src="https://static.wagent.app/icons/github.png" alt="GitHub" style="width: 20px; height: 20px;">
          </a>
          <a href="https://discord.com/invite/wagent">
            <img src="https://static.wagent.app/icons/discord.png" alt="Discord" style="width: 20px; height: 20px;">
          </a>
        </div>
        <p style="margin-top: 20px;">© 2024 Wagent. All rights reserved.</p>
      </div>
    </div>
  `;
  container.appendChild(info);
  document.body.appendChild(container);

  setTimeout(async () => {
    const canvas = await html2canvas(container, { useCORS: true, scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });
    pdf.addImage(imgData, 'PNG', 0, 0, 595.28, 841.89);
    pdf.save('receipt.pdf');
    document.body.removeChild(container);
  }, 1000);
};

export default downloadReceiptWithTemplate;
