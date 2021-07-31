import { FormEvent, useState, memo } from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import { Container } from './styles';
import { useContributions } from '../../hooks/useContribution';

interface NewContributionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

function NewContributionModalComponent({ isOpen, onRequestClose }: NewContributionModalProps) {
  const [buyDate, setBuyDate] = useState(new Date());
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

    setBuyDate(new Date());
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
        <DatePicker
          onChange={date => setBuyDate(date as Date)}
          selected={buyDate}
          dateFormat="dd/MM/yyyy"
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

export const NewContributionModal = memo(NewContributionModalComponent);