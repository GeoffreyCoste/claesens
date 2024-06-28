/* import {DM_Sans, Bricolage_Grotesque} from 'next/font/google'; */
import {SideMenuProvider} from '@/context/sideMenuContext';
import {dm_sans} from './font';
import './globals.css';

/* export const dm_sans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin']
});
export const bricolage_grotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin']
}); */

export const metadata = {
  title: 'claesens',
  description: 'Emilie Claesens, Designer basée à Paris.'
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        <SideMenuProvider>{children}</SideMenuProvider>
      </body>
    </html>
  );
}
