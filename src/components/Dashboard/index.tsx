import { Summary } from '../../components/Summary';
import { ContributionsTable } from '../ContributionsTable';

import { Container } from './styles';

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <ContributionsTable />
    </Container>
  )
}