import { TaskControllerClientPage } from './app.po';

describe('task-controller-client App', () => {
  let page: TaskControllerClientPage;

  beforeEach(() => {
    page = new TaskControllerClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
