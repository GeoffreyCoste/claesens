import {SideMenuProvider} from '@/context/sideMenuContext';
import {dm_sans} from './fonts';
import './globals.css';

export const metadata = {
  title: 'claesens',
  description: 'Emilie Claesens, Designer basée à Paris.'
};

export default function RootLayout({children}) {
  return (
    <html lang="en" className={dm_sans.className}>
      <body>
        <SideMenuProvider>{children}</SideMenuProvider>
      </body>
    </html>
  );
}
