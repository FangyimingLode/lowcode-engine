import { PageSchema } from '@lowcode-engine/types';

export const defaultPageSchema: PageSchema = {
  componentName: 'Page',
  packageName: 'Page',
  containerType: 'Page',
  isContainer: true,
  children: [],
  props: {
    style: ''
  },
  extraProps: {
    id: {
      type: 'JSRunFunction',
      value: 'node => node.id'
    },
    dataSource: {
      type: 'DataSource',
      value: {
        url: '',
        method: 'GET',
        requestHandler: {
          type: 'JSFunction',
          value: 'function requestHandler(params){return params}'
        },
        responseHandler: {
          type: 'JSFunction',
          value: 'function responseHandler(response) { return response.data }'
        }
      }
    }
  },
  lifeCycle: {},
  // 网络请求拦截器
  interceptors: {
    response: {
      type: 'JSFunction',
      value: `
            /**
             * axios 响应拦截器
             * @responseData： AxiosResponse['data']
            */
             function responseInterceptor(responseData){
                if (responseData.code !== '0') {
                    return Promise.reject(responseData.msg)
                } else {
                    if (responseData.data.token) {
                        localStorage.setItem('token', responseData.data.token)
                    }
                    return responseData.data
                }
            }`
    },
    request:
      {
      type: "JSFunction",
      value: `
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
            `
    }
  }
}
