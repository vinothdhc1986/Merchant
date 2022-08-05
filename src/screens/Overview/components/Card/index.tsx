import React, { FC } from 'react';
import { format } from 'date-fns';
import imgURL from '../../../../lib/imgURL';
import { numberWithCommas } from '../../../../lib/helper';
import Props from './typing';

const Index: FC<Props> = (props): JSX.Element => {
  const {
    title,
    todayDate,
    amount,
    topRightIcon,
    totalTransactions,
   // successPercentage,
    bottomLeftLabel,
    amountPercentageChange,
  } = props;

  return (
    <React.Fragment>
      <div className="inner-transtion-block">
        <div className="creditCard-icon">
          <img src={topRightIcon} alt="icon" />
        </div>
        <h6>{title}</h6>
        <span className="sub-rext">
        {title === 'Today’s Settlement' ? (
              <>
               Last Sync: {todayDate
            ? format(new Date(todayDate), 'dd MMM, yyyy . hh a')
            : format(new Date(), 'dd MMM, yyyy  . hh a')}
              </>
            ) : (
              <>
                {todayDate
            ? format(new Date(todayDate), 'dd MMM, yyyy')
            : format(new Date(), 'dd MMM, yyyy')}
              </>
            )}
          
        </span>
        {title ==='Today’s Transactions'?(
          <>  <div className="totalPrice">
          <em>₹</em> {numberWithCommas(amount)}
          </div>
          </>
        ):(
          <div className="rows">
        <div className="innertotalPrice">
          <em>₹</em> {numberWithCommas(amount)}
          </div>
          <>
          <div >
         <ul style={{color:'red',right:0,listStyleType:'none'}}>{numberWithCommas(totalTransactions)}</ul>
          <li style={{color:'#9395a1',marginTop:-10,listStyleType:'none'}} >{bottomLeftLabel}</li>
          </div>
          </>
        </div>)}
        {
          <div
            style={!amountPercentageChange ? { visibility: 'hidden' } : {}}
            className="graphRate"
          >
            {title === 'Refunds' ? (
              <>
                <img src={imgURL['union-down']} alt="down" />
                <span style={{color:'red'}}>{`${Math.abs(Number(amountPercentageChange))}% `}</span>
                Down from yesterday
              </>
            ) : (
              <>
                <img src={imgURL['union-up']} alt="up" />
                <span>{`${amountPercentageChange}% `}</span>
                Up from yesterday
              </>
            )}
          </div>
        }
        {/* <div className="foot">
          <div className="Transactions">
            <h4>{bottomLeftLabel}</h4>
            {numberWithCommas(totalTransactions)}
          </div>
          {successPercentage ? (
            <div className="Success">
              <h4>SUCCESS</h4>
              {`${successPercentage}%`}
            </div>
          ) : null}
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default Index;
