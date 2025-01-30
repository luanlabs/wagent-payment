import Copy from '../../assets/Copy';
import Tooltip from '../Tooltip';

const CopyButton = ({ text }: { text: string }) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <Tooltip text="Text Copied">
      <div onClick={copyToClipboard}>
        <Copy fill="#667085" />
      </div>
    </Tooltip>
  );
};

export default CopyButton;
