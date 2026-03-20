import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Animal Cards',
  description: 'Learn about animals through swipeable cards',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppProvider>
            {children}
          </AppProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
