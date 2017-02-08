import { McroblogFrontEndPage } from './app.po';

describe('mcroblog-front-end App', function() {
  let page: McroblogFrontEndPage;

  beforeEach(() => {
    page = new McroblogFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
