import styled from '@emotion/styled';
import NxWelcome from './nx-welcome';
import { DefaultGenerator } from '@lowcode-engine/default-generator';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <NxWelcome title="engine" />
      <DefaultGenerator />
    </StyledApp>
  );
}

export default App;
