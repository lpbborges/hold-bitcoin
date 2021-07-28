import { QuotationPanel } from '../QuotationPanel';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewContributionModal: () => void;
}

export function Header({ onOpenNewContributionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <QuotationPanel />
        <button type="button" onClick={onOpenNewContributionModal}>
          Novo aporte
        </button>
      </Content>
    </Container>
  )
}