import Nav from './components/Nav.jsx'
import ScrollWindow from './components/ScrollWindow.jsx'
import Products from './components/Products.jsx'
import Reviews from './components/Reviews.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'
import {
  AnnouncementBar,
  Formulary,
  Guarantee,
  HeroIntro,
  Problem,
  Ritual,
} from './components/Sections.jsx'

export default function App() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <HeroIntro />
        <ScrollWindow />
        <Problem />
        <Formulary />
        <Products />
        <Ritual />
        <Reviews />
        <Guarantee />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
