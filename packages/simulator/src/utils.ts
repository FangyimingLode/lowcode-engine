

class DeferUtil {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private renderResolverHandler: Function  | undefined;

  waitMounted() {
    return new Promise((resolve) => {
      this.renderResolverHandler = resolve;
    });
  }

  resolvedRender() {
    if (this.renderResolverHandler) {
      this.renderResolverHandler();
    }
  }
}
export const deferUtil = new DeferUtil()
