import { NgrxGolPage } from './app.po';

describe('ngrx-gol App', function() {
  let page: NgrxGolPage;

  beforeEach(() => {
    page = new NgrxGolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
