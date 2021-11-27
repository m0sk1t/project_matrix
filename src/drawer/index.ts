
import bubbleChart from "./bubbleChart";

const CHARTS: Record<string, any> = {
  bubbleChart,
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
const ALPHABET_LENGTH = ALPHABET.length;

const generateRandomName = () => {
  const nameLength = Math.floor(Math.random() * 20);
  const libName = [];
  for (let i = 0; i < nameLength; i++) {
    libName.push(ALPHABET[Math.floor(Math.random() * ALPHABET_LENGTH)]);
  }

  return libName.join('');
}

const generateRandomData = () => {
  const result = [];
  for (let i = 0; i < 30; i++) {

    result.push({
      r: Math.floor(Math.random() * 50),
      label: generateRandomName(),
    });
  }

  return result;
};

const renderImage = async (repoName: string, chart?: string, data?: any) => {
  await CHARTS[chart || 'bubbleChart'](data || generateRandomData(), repoName);
};

export default renderImage;
