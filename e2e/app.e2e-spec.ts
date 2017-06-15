import { ZomoztestPage } from './app.po';

describe('zomoztest App', () => {
  let page: ZomoztestPage;

  beforeEach(() => {
    page = new ZomoztestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
