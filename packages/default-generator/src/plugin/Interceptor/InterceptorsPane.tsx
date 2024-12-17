import { useState } from 'react';
import { useEngineStore } from '@lowcode-engine/model';
import { Interceptors } from '@lowcode-engine/types';
import { Button, Popover } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { MonacoEditor } from '@lowcode-engine/monaco-editor';

const defaultConfig = {
  request: {
    commit: `
        /**
           * axios 请求拦截器
           * @param config: AxiosRequestConfig
           * @returns: AxiosRequestConfig
        */
        `,
    body: `
        function requestInterceptor(config) {
            const token = localStorage.getItem('token')
            if (token) {
                if (!config.headers) {
                    config.headers = {}
                }
                config.headers.authorization = token;
            }
            return config;
        }
        `,
  },
  response: {
    commit: `
        /**
            * axios 响应拦截器
            * @param responseData: AxiosResponse['data']
            * @returns: thenable | non-thenable
        */
        `,
    body: `
        function responseInterceptor(responseData){
            if (responseData.code !== '0') {
                return Promise.reject(responseData.msg)
            } else {
                if (responseData.data.token) {
                    localStorage.setItem('token', responseData.data.token)
                }
                return responseData.data
            }
        }
        `,
  },
};

export default function InterceptorsPane() {
  const [active, setActive] = useState(false);
  const interceptors = useEngineStore(state => state.schema.interceptors);
  const updateInterceptors = useEngineStore(state => state.updateInterceptors)


  const handleOpen = () => {
    setActive(!active);
  };

  const handleChange = (name: keyof Interceptors) => (value: string) => {
    updateInterceptors(name, {
      type: 'JSFunction',
      value,
    });
  };
  console.log(interceptors, 'interceptors');
  const handleAddInterceptor =
    (name: keyof Interceptors) => () => {
      updateInterceptors(name, {
        type: 'JSFunction',
        value: `${defaultConfig[name].commit}\n${defaultConfig[name].body}`,
      });
    };


  return (
    <div>
      请求拦截器
      <Popover
        trigger={'click'}
        placement={'rightTop'}
        open={active}
        onOpenChange={handleOpen}
        content={
          <div
            css={css`
              width: 450px;
              overflow: auto;
            `}
          >
            <div>
              <div>拦截器设置</div>
              {interceptors.request !== undefined ? (
                <MonacoEditor
                  value={interceptors.request.value}
                  onChange={handleChange('request')}
                  onBlur={handleChange('request')}
                  language={'JavaScript'}
                />
              ) : (
                <Button
                  type="dashed"
                  size="small"
                  onClick={handleAddInterceptor('request')}
                >
                  添加
                </Button>
              )}
            </div>
          </div>
        }
      >
        <ClockCircleOutlined />
      </Popover>
    </div>
  );
}
