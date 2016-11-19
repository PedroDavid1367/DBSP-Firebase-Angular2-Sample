import { DBSPFirebaseAngular2SamplePage } from './app.po';

describe('dbsp-firebase-angular2-sample App', function() {
  let page: DBSPFirebaseAngular2SamplePage;

  beforeEach(() => {
    page = new DBSPFirebaseAngular2SamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
