import './globals.css';
import Navbar from '@/components/Navbar';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const metadata = {
  title: 'MARKER',
  description: '가고싶은 곳엔. MARKER',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="ko">
      <body className="bg-back text-body text-gray">
        <div className="box-border flex min-h-screen w-screen flex-col items-center justify-start font-pretendard">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
