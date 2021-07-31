import { FormEvent, useState, memo } from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import DatePicker from 'react-datepicker';

import { Container } from './styles';
import { useContributions } from '../../hooks/useContribution';
import { useSettings } from '../../hooks/useSettings';
import { CurrencySymbolEnum } from '../../enum/CurrencySymbolEnum';

interface NewContributionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

function NewContributionModalComponent({ isOpen, onRequestClose }: NewContributionModalProps) {
  const [buyDate, setBuyDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const { settings } = useSettings();
  const { currency } = settings;

  const { createContribution } = useContributions();

  async function handleCreateNewContribution(event: FormEvent) {
    event.preventDefault();

    await createContribution({
      buyDate,
      amount: Number(amount || '0'),
      price: Number(price || '0'),
    });

    setBuyDate(new Date());
    setAmount('');
    setPrice('');

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
        <DatePicker
          onChange={date => setBuyDate(date as Date)}
          selected={buyDate}
          dateFormat="dd/MM/yyyy"
        />
        <label>Aporte {CurrencySymbolEnum[currency]}</label>
        <input
          step="0.01"
          min="0"
          type="number"
          value={amount}
          onChange={event => setAmount(event.target.value)}
        />
        <label>
          Cotação na data
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={event => setPrice(event.target.value)}
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

export const NewContributionModal = memo(NewContributionModalComponent);