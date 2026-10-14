import "../scss/app.scss";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
       <Nav /> 
        {children}
        <Footer />
      </body>
    </html>
  );
}
