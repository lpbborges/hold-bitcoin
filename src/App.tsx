import { useCallback, useState } from 'react';
import Modal from 'react-modal';

import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewContributionModal } from './components/NewContributionModal';
import { AppProvider } from './hooks';

import { GlobalStyle } from './styles/global';

Modal.setAppElement("#root");

function App() {
  const [isNewContributionModalOpen, setIsNewContributionModalOpen] = useState(false);

  const handleOpenNewContributionModal = useCallback(async () => {
    setIsNewContributionModalOpen(true);
  }, []);

  const handleCloseNewContributionModal = useCallback(async () => {
    setIsNewContributionModalOpen(false);
  }, []);

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
