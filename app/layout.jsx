import {SideMenuProvider} from '@/context/sideMenuContext';
import {DM_Sans, Bricolage_Grotesque} from 'next/font/google';
import './globals.css';

export const metadata = {
  title: 'claesens',
  description: 'Emilie Claesens, Designer basée à Paris.'
};

const dm_sans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap'
});

const bricolage_grotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({children}) {
  return (
    <html
      lang="en"
      className={`${dm_sans.className} ${bricolage_grotesque.variable}`}
    >
      <body>
        <SideMenuProvider>{children}</SideMenuProvider>
      </body>
    </html>
  );
}
