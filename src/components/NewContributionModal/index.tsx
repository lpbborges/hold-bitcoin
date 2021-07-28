import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';

import { Container } from './styles';
import { useContributions } from '../../hooks/useContribution';

interface NewContributionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewContributionModal({ isOpen, onRequestClose }: NewContributionModalProps) {
  const [buyDate, setBuyDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const { createContribution } = useContributions();

  async function handleCreateNewContribution(event: FormEvent) {
    event.preventDefault();

    await createContribution({
      buyDate,
      amount,
      price,
    });

    setBuyDate('');
    setAmount(0);
    setPrice(0);

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <MdClose size={20} color="#525252" />
      </button>

      <Container onSubmit={handleCreateNewContribution}>
        <h2>
          Cadastrar aporte
        </h2>
        <label>Data da compra</label>
        <input
          type="date"
          value={buyDate}
          onChange={event => setBuyDate(event.target.value)}
        />
        <label>Aporte</label>
        <input
          type="number"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />
        <label>Cotação na data</label>
        <input
          type="number"
          value={price}
          onChange={event => setPrice(Number(Number(event.target.value).toFixed(8)))}
        />

        <button
          type="submit"
        >
          Confirmar
        </button>
      </Container>
    </Modal>
  )
}