import styled from '@emotion/styled';
import { usePluginStore, useSkeletonStore } from '@lowcode-engine/model';
import { useEffect } from 'react';
import LeftArea from '../layout/LeftArea';
import { css } from '@emotion/react';
import { defaultPlugin } from '@lowcode-engine/default-generator';
const StyledApp = styled.div`
  // Your style here
`;
const TestRightComponent = () => (
  <div
    css={css`
      background: aqua;
    `}
  >
    Right Area Content
  </div>
);
const TestToolbarComponent = () => <div>Toolbar Content</div>;
export function App() {
  const plugins = usePluginStore();
  useEffect(() => {
    defaultPlugin.forEach((pluginComponent) =>
      plugins.register(pluginComponent)
    );
  }, []);
  return (
    <StyledApp>
      <LeftArea />
      <TestRightComponent />
      {/*<NxWelcome title="engine" />*/}
      <TestToolbarComponent />
    </StyledApp>
  );
}

export default App;
