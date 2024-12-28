import { defaultPageSchema, useEngineStore, usePluginStore } from '@lowcode-engine/model';
import { useEffect } from 'react';
import LeftArea from '../layout/LeftArea';
import { css } from '@emotion/react';
import { defaultPlugin } from '@lowcode-engine/default-generator';
import { Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export function App() {
  const plugins = usePluginStore();
  const setSchema = useEngineStore(state => state.setSchema)
  useEffect(() => {
    setSchema(defaultPageSchema)
    defaultPlugin.forEach((pluginComponent) =>
      plugins.register(pluginComponent)
    );
  }, []);
  return (
    <Flex>
      {/*<LeftArea />*/}
      <Layout
        css={css`
          border-radius: 8px;
          overflow: hidden;
          width: 100vw;
          min-height: 100vh;
        `}
      >
        <Sider
          width="10%"
          css={css`
            text-align: center;
            line-height: 120px;
            color: #fff;
            background-color: #1677ff;
          `}
        >
          <LeftArea />
        </Sider>
        <Layout id={'content'} style={{position: 'relative'}}>
          <Header
            css={css`
              text-align: center;
              color: #fff;
              height: 64px;
              padding-inline: 48px;
              line-height: 64px;
              background-color: #4096ff;
            `}
          >
            Header
          </Header>
          <Content
            css={css`
              text-align: center;
              min-height: 120px;
              line-height: 120px;
              color: #fff;
              background-color: #0958d9;
            `}
          >
            Content
          </Content>
          <Footer
            css={css`
              text-align: center;
              color: #fff;
              background-color: #4096ff;
            `}
          >
            Footer
          </Footer>
        </Layout>
      </Layout>
    </Flex>
  );
}

export default App;
