import { Grid } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import qr_code from 'src/assets/images/qr_code.png'
import app_store from 'src/assets/images/app_store.png'
import google_play from 'src/assets/images/google_play.png'
import app_gallery from 'src/assets/images/app_gallery.png'
import './styles.scss'
import { useTranslation } from 'react-i18next'

function Footer(props) {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={2} className="footer__top">
          <Grid item xs={12} md>
            <h3 className="footer__heading">{t('footer.customerCare')}</h3>
            <ul className="footer__list">
              <li className="footer__item">
                <Link to={path.home} className="footer__item-link">
                  {t('footer.helpCenter')}
                </Link>
              </li>
              <li className="footer__item">
                <Link to={path.home} className="footer__item-link">
                  {t('footer.shoppingGuide')}
                </Link>
              </li>
              <li className="footer__item">
                <Link to={path.home} className="footer__item-link">
                  {t('footer.sellingGuide')}
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md>
            <h3 className="footer__heading">{t('footer.aboutShopy')}</h3>
            <ul className="footer__list">
              <li className="footer__item">
                <Link to={path.home} className="footer__item-link">
                  {t('footer.recruitment')}
                </Link>
              </li>
              <li className="footer__item">
                <Link to={path.home} className="footer__item-link">
                  {t('footer.shopyRules')}
                </Link>
              </li>
              <li className="footer__item">
                <Link to={path.home} className="footer__item-link">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md>
            <h3 className="footer__heading">{t('footer.payment')}</h3>
            <img
              className="footer__payment"
              src="https://library.kissclipart.com/20181007/lse/kissclipart-accept-visa-and-mastercard-clipart-mastercard-visa-8cdc2f236dd98c72.png"
              alt="payment method"
            ></img>
          </Grid>
          <Grid item xs={12} md>
            <h3 className="footer__heading">{t('footer.followUs')}</h3>
            <ul className="footer__list">
              <li className="footer__item">
                <Link to={path.home} className="footer__item-link">
                  <FaFacebook className="footer__item-icon" />
                  Facebook
                </Link>
              </li>
              <li className="footer__item">
                <Link to={path.home} className="footer__item-link">
                  <FaInstagram className="footer__item-icon" />
                  Instagram
                </Link>
              </li>
              <li className="footer__item">
                <Link to={path.home} className="footer__item-link">
                  <FaLinkedin className="footer__item-icon" />
                  Linkedin
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md>
            <h3 className="footer__heading">{t('footer.downloadApp')}</h3>
            <div className="footer__download">
              <Link to={path.home}>
                <img
                  src={qr_code}
                  alt="download-qr"
                  className="footer__download-qr"
                />
              </Link>
              <div className="footer__download-apps">
                <Link to={path.home}>
                  <img
                    src={app_store}
                    alt="download app on appstore"
                    className="footer__download-app-img"
                  />
                </Link>
                <Link to={path.home}>
                  <img
                    src={google_play}
                    alt="download app on googleplay"
                    className="footer__download-app-img"
                  />
                </Link>
                <Link to={path.home}>
                  <img
                    src={app_gallery}
                    alt="download app on appgallery"
                    className="footer__download-app-img"
                  />
                </Link>
              </div>
            </div>
          </Grid>
          <Grid container spacing={2} className="footer__bottom">
            <Grid item xs={12} lg={3}>
              <p>© 2021 Shopy. {t('footer.copyright')}</p>
            </Grid>
            <Grid item xs={12} lg={9}>
              <p className="footer__country">{t('footer.country')}</p>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer
