import React, { FC, useState } from 'react';
import AboutHeader from 'components/AboutHeader';
import Tabs from 'components/Tabs';
import GateWays from './components/GatewayTab';
import PreferenceScore from './components/PreferenceScoreTab';
import PriorityLogic from './components/PriorityLogicTab';
import SubHeader from 'components/SubHeader';
import FAQModal from './components/FAQModal';
import { TAB_CONSTANTS } from './constants';
import './styles.scss';

const SmartRouting: FC = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<string>(
    TAB_CONSTANTS && TAB_CONSTANTS[0]?.value
  );
  const [showFAQModal, setShowFAQModal] = useState<boolean>(false);
  const renderTabContent = (tab: string): JSX.Element | null => {
    switch (tab) {
      case 'gateway':
        return <GateWays />;
      case 'preferenceScores':
        return <PreferenceScore />;
      case 'priorityLogic':
        return <PriorityLogic />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className='smart-routing'>
        <AboutHeader
          title='Smart Routing'
          content='Configure the routing logic of your integrated payment gateways based on data.'
        />
        <SubHeader
          title='Smart Routing'
          description='Integrate payment gateways and configure routing based on multiple
      parameters'
          svgIcon='smartRouting-icon-white'
          showIcon={true}
          svgDetail='Smart Routing'
        />
        <Tabs
          options={TAB_CONSTANTS}
          value={selectedTab}
          onChange={(value) => setSelectedTab(value)}
          extraContent={<span onClick={() => setShowFAQModal(true)}>FAQ</span>}
          extraContentWrapperClassName='faq-link-wrapper'
        />
        {renderTabContent(selectedTab)}
      </div>
      {showFAQModal && <FAQModal closeModal={() => setShowFAQModal(false)} />}
    </>
  );
};

export default SmartRouting;
