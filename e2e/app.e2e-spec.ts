import { SnackbarPage } from './app.po';

describe('snackbar App', function() {
  let page: SnackbarPage;

  beforeEach(() => {
    page = new SnackbarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
