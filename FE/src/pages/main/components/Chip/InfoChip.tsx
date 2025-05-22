import { ChipContainer } from './InfoChipStyle';

interface InfoChipProps {
  label: string;
}

const InfoChip: React.FC<InfoChipProps> = ({ label }) => {
  return <ChipContainer>{label}</ChipContainer>;
};

export default InfoChip;
