import { useState } from 'react';
import Modal from 'react-modal';

import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewContributionModal } from './components/NewContributionModal';

import { GlobalStyle } from './styles/global';
import { AppProvider } from './hooks';

Modal.setAppElement("#root");

function App() {
  const [isNewContributionModalOpen, setIsNewContributionModalOpen] = useState(false);

  function handleOpenNewContributionModal() {
    setIsNewContributionModalOpen(true);
  }

  function handleCloseNewContributionModal() {
    setIsNewContributionModalOpen(false);
  }

  return (
    <AppProvider>
      <GlobalStyle />
      <Header onOpenNewContributionModal={handleOpenNewContributionModal} />
      <Dashboard />
      <NewContributionModal
        isOpen={isNewContributionModalOpen}
        onRequestClose={handleCloseNewContributionModal}
      />
    </AppProvider>
  );
}

export { App };
