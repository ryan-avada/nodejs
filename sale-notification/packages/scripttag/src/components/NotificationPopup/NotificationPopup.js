import React from 'react';
import moment from 'moment';
import './NoticationPopup.scss';
import {truncateString} from '@avada/assets/src/helpers/utils';

export const NotificationPopup = ({
                                    firstName = 'John Doe',
                                    city = 'New York',
                                    country = 'United States',
                                    productName = 'Puffer Jacket With Hidden Hood',
                                    timestamp = `${new Date()}`,
                                    productImage = 'https://m.media-amazon.com/images/I/61iR9NMcKpL._UL1280_.jpg',
                                    settings = {hideTimeAgo: false, truncateProductName: false, position: 'top-left'}
                                  }) => {

  const {hideTimeAgo, truncateProductName, position} = settings;

  return (
    <div className={"Avava-SP__Wrapper fadeInUp animated "+position}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>
                Purchased{' '}
                {truncateProductName
                  ? truncateString(productName, 16)
                  : productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {hideTimeAgo ? '' : `${moment(timestamp).fromNow()}`}{' '}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
